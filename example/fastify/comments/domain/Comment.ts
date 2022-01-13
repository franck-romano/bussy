import { DomainEvent } from '../../../../src/eventBus/types/DomainEvent';
import { CommentCreatedEvent } from '../write/events/CommentCreatedEvent';

export class Comment {
  private events: Array<DomainEvent> = [];

  private constructor(public id: string, public content: string) {}

  get raisedEvents(): ReadonlyArray<DomainEvent> {
    return this.events;
  }

  static create(content: string) {
    const id = Math.floor(Math.random() * 10000).toFixed();

    const createComment = new this(id, content);
    createComment.events.push(new CommentCreatedEvent(id, content));

    return createComment;
  }
}
