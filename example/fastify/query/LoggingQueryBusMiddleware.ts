import { LoggingQueryBusMiddleware } from './query/QueryLoggingQueryBusMiddleware';
import { queryBusDispatcherMiddleware } from './query/QueryBusDispatcherMiddleware';
import { logger } from './Logger';

export const loggingQueryBusMiddleware = new LoggingQueryBusMiddleware(queryBusDispatcherMiddleware, logger);
