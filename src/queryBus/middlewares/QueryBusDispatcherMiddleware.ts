import { QueryHandlers } from '../types/QueryBus';
import { Query } from '../types/Query';
import { ReadModel } from '../types/ReadModel';
import { QueryNotHandledError } from '../types/QueryNotHandledError';
import { QueryMiddleware } from './QueryMiddleware';

export class QueryBusDispatcherMiddleware implements QueryMiddleware {
  private constructor(private queryHandlers: QueryHandlers) {}

  static build(queryHandlers: QueryHandlers): QueryBusDispatcherMiddleware {
    return new QueryBusDispatcherMiddleware(queryHandlers);
  }

  async handle(query: Query): Promise<ReadModel> {
    const queryName = query.label();
    const queryHandler = this.queryHandlers[queryName];

    if (!queryHandler) {
      throw new QueryNotHandledError(queryName);
    }

    return queryHandler.handle(query);
  }
}
