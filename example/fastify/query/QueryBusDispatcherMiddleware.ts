import { QueryBusDispatcherMiddleware } from '../../../src/queryBus/middlewares/QueryBusDispatcherMiddleware';
import { HelloWorldQuery } from './HelloWorldQuery';
import { HelloWorldQueryHandler } from './HelloWorldQueryHandler';

export const queryBusDispatcherMiddleware = new QueryBusDispatcherMiddleware({
  [HelloWorldQuery.name]: new HelloWorldQueryHandler()
});
