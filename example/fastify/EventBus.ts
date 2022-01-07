import { EventBus } from '../../src';
import { logger } from './Logger';
import { LoggingEventBusMiddleware } from '../../src/eventBus/middlewares/LoggingEventBusMiddleware';
import { CommentCreatedEvent } from './command/events/CommentCreatedEvent';
import { CommentCreatedEventHandler } from './command/events/CommentCreatedEventHandler';

export const eventBus = new EventBus(logger)
  .registerMiddlewares([new LoggingEventBusMiddleware(logger)])
  .registerEventHandlers({ [CommentCreatedEvent.name]: [new CommentCreatedEventHandler()] });
