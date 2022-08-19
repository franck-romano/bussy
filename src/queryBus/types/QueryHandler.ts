import { Query } from './Query';

export interface QueryHandler<RESULT, QUERY extends Query<RESULT>> {
  name(): string;

  handle(query: QUERY): Promise<RESULT>;
}
