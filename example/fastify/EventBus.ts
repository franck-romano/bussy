import { EventBus } from '../../src';
import { logger } from './Logger';
import { LoggingEventBusMiddleware } from '../../src/eventBus/middlewares/LoggingEventBusMiddleware';
import { CommentCreatedEvent } from './command/events/CommentCreatedEvent';
import { CommentCreatedEventHandler } from './command/events/CommentCreatedEventHandler';

export const eventBus = new EventBus(logger, [new LoggingEventBusMiddleware(logger)], {
  [CommentCreatedEvent.name]: [new CommentCreatedEventHandler()]
});
