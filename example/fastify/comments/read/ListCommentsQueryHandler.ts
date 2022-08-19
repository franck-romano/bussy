import { QueryHandler } from '../../../../src/queryBus/types/QueryHandler';
import { ListCommentsQuery } from './ListCommentsQuery';
import { CommentRepository } from '../domain/CommentRepository';
import { Comment } from '../domain/Comment';

export class ListCommentsQueryHandler implements QueryHandler<Comment[], ListCommentsQuery> {
  constructor(private repository: CommentRepository) {}

  name = (): string => ListCommentsQueryHandler.name;

  async handle(query: ListCommentsQuery): Promise<Comment[]> {
    return this.repository.list();
  }
}
