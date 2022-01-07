import { DomainEvent } from './DomainEvent';

export interface EventHandler<EVENT extends DomainEvent> {
  name(): string;

  reactTo(event: EVENT): Promise<void>;
}
