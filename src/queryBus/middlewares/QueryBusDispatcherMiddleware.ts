import { QueryHandlers } from '../types/QueryBus';
import { Query } from '../types/Query';
import { ReadModel } from '../types/ReadModel';
import { QueryNotHandledError } from '../types/QueryNotHandledError';
import { QueryMiddleware } from '../types/QueryMiddleware';

export class QueryBusDispatcherMiddleware extends QueryMiddleware {
  constructor(private queryHandlers: QueryHandlers) {
    super();
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
