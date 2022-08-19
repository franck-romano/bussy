import { Query } from '../types/Query';
import { ChainableMiddleware } from '../../common/ChainableMiddleware';

export interface QueryMiddleware {
  handle<RESULT>(query: Query<RESULT>): Promise<RESULT>;
}

export type ChainableQueryMiddleware<SELF extends QueryMiddleware> = ChainableMiddleware<SELF>;
