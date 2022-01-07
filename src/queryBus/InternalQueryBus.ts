import { QueryBus } from './types/QueryBus';
import { Query } from './types/Query';
import { ReadModel } from './types/ReadModel';
import { QueryMiddlewareHandler } from './middlewares/QueryMiddleware';

export class InternalQueryBus implements QueryBus {
  constructor(private middlewareChain: QueryMiddlewareHandler) {}

  async publish(query: Query): Promise<ReadModel> {
    return this.middlewareChain.handle(query);
  }
}
