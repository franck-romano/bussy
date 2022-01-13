import { QueryHandler } from '../../../../src/queryBus/types/QueryHandler';
import { ListCommentsQuery } from './ListCommentsQuery';
import { CommentRepository } from '../domain/CommentRepository';
import { CommentsReadModel } from './CommentsReadModel';

export class ListCommentsQueryHandler implements QueryHandler<ListCommentsQuery> {
  constructor(private repository: CommentRepository) {}

  async handle(query: ListCommentsQuery): Promise<CommentsReadModel> {
    const comments = this.repository.list();
    return {
      comments: comments.map(({ id, content }) => ({ id, content }))
    };
  }

  name = (): string => ListCommentsQueryHandler.name;
}
