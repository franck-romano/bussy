import { DomainEvent } from '../../../../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../../../../src/eventBus/types/SerializedDomainEvent';

export class CommentCreatedEvent implements DomainEvent {
  constructor(public id: string, public commentContent: string) {}

  label = () => CommentCreatedEvent.name;
  occurredOn = () => new Date();
  serialize = (): SerializedDomainEvent => ({
    data: { id: this.id, content: this.commentContent },
    occurredOn: this.occurredOn().toISOString()
  });
}
