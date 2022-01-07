import { DomainEvent } from '../../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../../src/eventBus/types/SerializedDomainEvent';

export class CommentCreatedEvent implements DomainEvent {
  constructor(public commentContent: string) {}

  label = () => CommentCreatedEvent.name;
  occurredOn = () => new Date();
  serialize = (): SerializedDomainEvent => ({
    data: { content: this.commentContent },
    occurredOn: this.occurredOn().toISOString()
  });
}
