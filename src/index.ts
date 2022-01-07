import { InternalEventBus } from './eventBus/InternalEventBus';
import { InternalCommandBus } from './commandBus/InternalCommandBus';
import { InternalQueryBus } from './queryBus/InternalQueryBus';
import { DefaultEventBusLoggingMiddleware } from './eventBus/middlewares/DefaultEventBusLoggingMiddleware';
import { PinoLogger } from './common/BusLogger';

const logger = new PinoLogger();

export const EventBus = new InternalEventBus(logger).registerMiddlewares([
  new DefaultEventBusLoggingMiddleware(logger)
]);
export const QueryBus = new InternalCommandBus();
export const CommandBus = new InternalQueryBus();
