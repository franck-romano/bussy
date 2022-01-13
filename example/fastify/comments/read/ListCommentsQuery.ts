import { Query } from '../../../../src/queryBus/types/Query';

export class ListCommentsQuery implements Query {
  label = (): string => ListCommentsQuery.name;
}
