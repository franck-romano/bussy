import fastify from 'fastify';
import { CommandBus, QueryBus } from '../../src';
import { ListCommentsQuery } from './query/ListCommentsQuery';
import { CreateCommentCommand } from './command/CreateCommentCommand';
import { logger } from './Logger';
import { LoggingCommandBusMiddleware } from '../../src/commandBus/middlewares/LoggingCommandBusMiddleware';
import { EventDispatcherMiddleware } from '../../src/commandBus/middlewares/EventDispatcherMiddleware';
import { eventBus } from './EventBus';
import { CommandBusDispatcherMiddleware } from '../../src/commandBus/middlewares/CommandBusDispatcherMiddleware';
import { CreateCommentCommandHandler } from './command/CreateCommentCommandHandler';
import { LoggingQueryBusMiddleware } from '../../src/queryBus/middlewares/LoggingQueryBusMiddleware';
import { QueryBusDispatcherMiddleware } from '../../src/queryBus/middlewares/QueryBusDispatcherMiddleware';
import { ListCommentsQueryHandler } from './query/ListCommentsQueryHandler';

const server = fastify({ logger: true });

const queryBus = new QueryBus(
  new LoggingQueryBusMiddleware(logger).chainWith(
    new QueryBusDispatcherMiddleware({
      [ListCommentsQuery.name]: new ListCommentsQueryHandler()
    }).chainWith()
  )
);

const commandBus = new CommandBus(
  new LoggingCommandBusMiddleware(logger).chainWith(
    new EventDispatcherMiddleware(eventBus).chainWith(
      new CommandBusDispatcherMiddleware({ [CreateCommentCommand.name]: new CreateCommentCommandHandler() }).chainWith()
    )
  )
);

server.get('/comments', async (request, reply) => {
  return queryBus.publish(new ListCommentsQuery());
});

server.post<{ Body: { content: string } }>('/comments', async (request, reply) => {
  const command = new CreateCommentCommand(request.body.content);
  const commandResponse = await commandBus.publish(command);
  return { id: commandResponse.result };
});

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    throw err;
  }
};
start();
