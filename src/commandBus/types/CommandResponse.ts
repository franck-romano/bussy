import { DomainEvent } from '../../eventBus/types/DomainEvent';

export interface CommandResponse {
  events: ReadonlyArray<DomainEvent>;
  result: string | number | boolean | void | null | Record<any, any>;
}
