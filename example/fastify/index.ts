import fastify from 'fastify';
import { CommandBus, EventBus, QueryBus } from '../../src';
import { ListCommentsQuery } from './comments/read/ListCommentsQuery';
import { CreateCommentCommand } from './comments/write/CreateCommentCommand';
import { LoggingCommandBusMiddleware } from '../../src/commandBus/middlewares/LoggingCommandBusMiddleware';
import { EventDispatcherMiddleware } from '../../src/commandBus/middlewares/EventDispatcherMiddleware';
import { CommandBusDispatcherMiddleware } from '../../src/commandBus/middlewares/CommandBusDispatcherMiddleware';
import { CreateCommentCommandHandler } from './comments/write/CreateCommentCommandHandler';
import { LoggingQueryBusMiddleware } from '../../src/queryBus/middlewares/LoggingQueryBusMiddleware';
import { QueryBusDispatcherMiddleware } from '../../src/queryBus/middlewares/QueryBusDispatcherMiddleware';
import { ListCommentsQueryHandler } from './comments/read/ListCommentsQueryHandler';
import { InMemoryCommentRepository } from './comments/domain/CommentRepository';
import { LoggingEventBusMiddleware } from '../../src/eventBus/middlewares/LoggingEventBusMiddleware';
import { CommentCreatedEvent } from './comments/write/events/CommentCreatedEvent';
import { CommentCreatedEventHandler } from './comments/write/events/CommentCreatedEventHandler';
import { PinoLogger } from '../../src/common/BusLogger';

const server = fastify({ logger: true });
const logger = new PinoLogger();
const commentRepository = new InMemoryCommentRepository();

const queryMiddlewareChain = LoggingQueryBusMiddleware.build(logger).chainWith(
  QueryBusDispatcherMiddleware.build({
    [ListCommentsQuery.name]: new ListCommentsQueryHandler(commentRepository)
  })
);

const eventBus = new EventBus(logger, [new LoggingEventBusMiddleware(logger)], {
  [CommentCreatedEvent.name]: [new CommentCreatedEventHandler()]
});

const commandMiddlewareChain = LoggingCommandBusMiddleware.build(logger).chainWith(
  EventDispatcherMiddleware.build(eventBus).chainWith(
    CommandBusDispatcherMiddleware.build({
      [CreateCommentCommand.name]: new CreateCommentCommandHandler(commentRepository)
    })
  )
);

const queryBus = new QueryBus(queryMiddlewareChain);
const commandBus = new CommandBus(commandMiddlewareChain);

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
