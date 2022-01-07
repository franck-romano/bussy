import { QueryHandlers } from '../types/QueryBus';
import { Query } from '../types/Query';
import { ReadModel } from '../types/ReadModel';
import { QueryNotHandledError } from '../types/QueryNotHandledError';
import { QueryMiddleware, QueryMiddlewareHandler } from '../types/QueryMiddleware';

export class QueryBusDispatcherMiddleware implements QueryMiddleware {
  constructor(private queryHandlers: QueryHandlers) {}

  chainWith(): QueryMiddlewareHandler {
    return {
      handle: async (query: Query): Promise<ReadModel> => {
        const queryName = query.label();
        const queryHandler = this.queryHandlers[queryName];

        if (!queryHandler) {
          throw new QueryNotHandledError(queryName);
        }

        return queryHandler.handle(query);
      }
    };
  }
}
