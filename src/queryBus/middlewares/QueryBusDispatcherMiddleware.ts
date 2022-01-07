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
    const queryHandler = this.queryHandlers[query.label()];
    if (!queryHandler) {
      throw new QueryNotHandledError(query.label());
    }
    return queryHandler.handle(query);
  }
}
