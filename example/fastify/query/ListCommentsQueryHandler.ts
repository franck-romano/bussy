import { QueryHandler } from '../../../src/queryBus/types/QueryHandler';
import { ListCommentsQuery } from './ListCommentsQuery';
import { ReadModel } from '../../../src/queryBus/types/ReadModel';

interface Comments extends ReadModel {
  comments: string[];
}

export class ListCommentsQueryHandler implements QueryHandler<ListCommentsQuery> {
  async handle(query: ListCommentsQuery): Promise<Comments> {
    return { comments: ['wow', 'super', 'nice'] };
  }

  name = (): string => ListCommentsQueryHandler.name;
}
