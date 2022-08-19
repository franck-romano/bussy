import { Query } from './types/Query';
import { QueryMiddleware } from './middlewares/QueryMiddleware';
import { QueryBus } from './types/QueryBus';

export class InternalQueryBus implements QueryBus {
  constructor(private middlewareChain: QueryMiddleware) {}

  async publish<RESULT>(query: Query<RESULT>): Promise<RESULT> {
    return this.middlewareChain.handle(query);
  }
}
