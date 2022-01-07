import { DomainEvent } from '../../eventBus/types/DomainEvent';

export interface CommandResponse {
  events: Readonly<DomainEvent[]>;
  result: string | number | boolean | void | null | Record<any, any>;
}
