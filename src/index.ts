import { InternalEventBus } from './eventBus/InternalEventBus';
import { InternalCommandBus } from './commandBus/InternalCommandBus';
import { InternalQueryBus } from './queryBus/InternalQueryBus';
import { LoggingEventBusMiddleware } from './eventBus/middlewares/LoggingEventBusMiddleware';
import { PinoLogger } from './common/BusLogger';
import { LoggingQueryBusMiddleware } from './queryBus/middlewares/LoggingQueryBusMiddleware';
import { QueryBusDispatcherMiddleware } from './queryBus/middlewares/QueryBusDispatcherMiddleware';

const logger = new PinoLogger();

export const EventBus = new InternalEventBus(logger).registerMiddlewares([new LoggingEventBusMiddleware(logger)]);
export const QueryBus = new InternalCommandBus();
const middleWares = new LoggingQueryBusMiddleware(new QueryBusDispatcherMiddleware({}), logger);

export const CommandBus = new InternalQueryBus(middleWares);
