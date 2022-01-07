import { ReadModel } from './ReadModel';
import { Query } from './Query';
import { Bus } from '../../common/Bus';
import { QueryHandler } from './QueryHandler';

export type QueryHandlers = { [query: string]: QueryHandler<Query> };

export interface QueryBus extends Bus<Query, ReadModel> {}
