import { DomainEvent } from './DomainEvent';

export interface EventMiddleware {
  reactTo(event: DomainEvent): void;
}
