import { ReadModel } from '../types/ReadModel';
import { Query } from '../types/Query';
import { Middleware } from '../../common/Middleware';

export interface QueryMiddleware extends Middleware<Query, ReadModel> {}
