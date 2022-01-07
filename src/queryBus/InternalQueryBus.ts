import { QueryBus } from './types/QueryBus';
import { Query } from './types/Query';
import { ReadModel } from './types/ReadModel';
import { ChainableQueryMiddleware } from './middlewares/QueryMiddleware';

export class InternalQueryBus implements QueryBus {
  constructor(private middlewareChain: ChainableQueryMiddleware) {}

  async publish(query: Query): Promise<ReadModel> {
    return this.middlewareChain.handle(query);
  }
}
