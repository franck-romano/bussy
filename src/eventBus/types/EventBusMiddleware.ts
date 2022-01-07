import { DomainEvent } from './DomainEvent';

export interface EventBusMiddleware {
  reactTo(event: DomainEvent): void;
}
