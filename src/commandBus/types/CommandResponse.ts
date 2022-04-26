import { DomainEvent } from '../../eventBus/types/DomainEvent';

export interface CommandResponse<RESULT> {
  events: ReadonlyArray<DomainEvent>;
  result: RESULT;
}
