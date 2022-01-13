import { ReadModel } from '../../../../src/queryBus/types/ReadModel';

export interface CommentsReadModel extends ReadModel {
  comments: {
    id: string;
    content: string;
  }[];
}
