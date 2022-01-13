import { ReadModel } from '../types/ReadModel';
import { Query } from '../types/Query';
import { Middleware } from '../../common/Middleware';
import { ChainableMiddleware } from '../../common/ChainableMiddleware';

export interface QueryMiddleware extends Middleware<Query, ReadModel> {}

export type ChainableQueryMiddleware<SELF extends QueryMiddleware> = ChainableMiddleware<SELF>;
