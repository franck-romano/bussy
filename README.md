# bussy

Configurable Command and Query (CQS) bus implementations.

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# How to use ?

Those examples are done using fastify as web server, but you can choose whatever you want (express, hapi etc).

Bussy bus implementations are framework-agnostic.

It provides a chainable middlewares wrapping strategy that is customizable based on your needs.

As full working example can be found [here](example/fastify/index.ts). 

# Write operations using Command

Can be wrapped by an Event Bus if some domain events are returned from your Command handlers.

In this example, the execution order will be the following:

1. LoggingEventBusMiddleware will log the incoming command
2. EventDispatcherMiddleware will trigger the CommandBusDispatcherMiddleware and will dispatch the resulting events if any 
3. CommandBusDispatcherMiddleware will execute the command and returns the result


```js
const server = fastify({ logger: true });
const logger = new PinoLogger();
const commentRepository = new InMemoryCommentRepository();

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

const commandBus = new CommandBus(commandMiddlewareChain);

server.post<{ Body: { content: string } }>('/comments', async (request, reply) => {
  const command = new CreateCommentCommand(request.body.content);
  const commandResponse = await commandBus.publish(command);
  return { id: commandResponse.result };
});

```

## Read operations using Query
Use for read operations.

```js
const server = fastify({ logger: true });
const logger = new PinoLogger();
const commentRepository = new InMemoryCommentRepository();

const queryMiddlewareChain = LoggingQueryBusMiddleware.build(logger).chainWith(
  QueryBusDispatcherMiddleware.build({
    [ListCommentsQuery.name]: new ListCommentsQueryHandler(commentRepository)
  })
);

const queryBus = new QueryBus(queryMiddlewareChain);

server.get('/comments', async (request, reply) => {
  return queryBus.publish(new ListCommentsQuery());
});
```
