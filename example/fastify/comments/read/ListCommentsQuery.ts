import { Query } from '../../../../src/queryBus/types/Query';
import { Comment } from '../domain/Comment';

export class ListCommentsQuery extends Query<Comment[]> {
  label = (): string => ListCommentsQuery.name;
}
