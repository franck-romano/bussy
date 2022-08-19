import { Query } from './Query';
import { QueryHandler } from './QueryHandler';
import { Bus } from '../../common/Bus';

export type QueryHandlers = { [query: string]: QueryHandler<any, Query<any>> };

export interface QueryBus extends Bus<Query<unknown>, unknown> {}
