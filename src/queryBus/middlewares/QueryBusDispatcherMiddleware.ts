import { QueryHandlers } from '../types/QueryBus';
import { Query } from '../types/Query';
import { QueryNotHandledError } from '../types/QueryNotHandledError';
import { QueryMiddleware } from './QueryMiddleware';
import { QueryHandler } from '../types/QueryHandler';

export class QueryBusDispatcherMiddleware implements QueryMiddleware {
  private constructor(private queryHandlers: QueryHandlers) {}

  static build(queryHandlers: QueryHandlers): QueryBusDispatcherMiddleware {
    return new QueryBusDispatcherMiddleware(queryHandlers);
  }

  async handle<RESULT>(query: Query<RESULT>): Promise<RESULT> {
    const queryName = query.label();
    const queryHandler: QueryHandler<RESULT, Query<RESULT>> = this.queryHandlers[queryName];

    if (!queryHandler) {
      throw new QueryNotHandledError(queryName);
    }

    return queryHandler.handle(query);
  }
}
