import { Message } from '../../common/Message';
import { SerializedDomainEvent } from './SerializedDomainEvent';

export interface DomainEvent extends Readonly<Message> {
  label(): string;

  occurredOn(): Date;

  serialize(): SerializedDomainEvent;
}
