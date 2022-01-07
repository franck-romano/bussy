import { ReadModel } from './ReadModel';
import { Query } from './Query';

export interface QueryHandler<QUERY extends Query> {
  name(): string;

  handle(query: QUERY): Promise<ReadModel>;
}
