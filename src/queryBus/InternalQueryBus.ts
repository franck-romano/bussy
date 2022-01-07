import { QueryBus, QueryHandlers } from './types/QueryBus';
import { Query } from './types/Query';
import { ReadModel } from './types/ReadModel';
import { QueryNotHandledError } from './types/QueryNotHandledError';

export class InternalQueryBus implements QueryBus {
  private queryHandlers: QueryHandlers = {};

  registerQueryHandlers(queryHandlers: QueryHandlers): QueryBus {
    this.queryHandlers = queryHandlers;
    return this;
  }

  async publish(query: Query): Promise<ReadModel> {
    const queryLabel = query.label();
    const queryHandler = this.queryHandlers[queryLabel];

    if (!queryHandler) {
      throw new QueryNotHandledError(queryLabel);
    }

    return queryHandler.handle(query);
  }
}
