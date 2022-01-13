import { Comment } from './Comment';

export interface CommentRepository {
  add(comment: Comment): void;

  list(): Comment[];
}

export class InMemoryCommentRepository implements CommentRepository {
  private comments: Array<Comment> = [];

  add(comment: Comment): void {
    this.comments.push(comment);
  }

  list(): Comment[] {
    return this.comments;
  }
}
