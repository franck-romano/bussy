import { DomainEvent } from '../../eventBus/types/DomainEvent';

export class CommandResponse<RESULT> {
  private constructor(public result: RESULT, public events: ReadonlyArray<DomainEvent>) {}

  static withResult<RESULT>(result: RESULT): CommandResponse<RESULT> {
    return new CommandResponse(result, []);
  }

  static withEvents<EVENT extends DomainEvent>(events: ReadonlyArray<EVENT>): CommandResponse<null> {
    return new CommandResponse(null, events);
  }

  static with<RESULT, EVENT extends DomainEvent>(
    result: RESULT,
    events: ReadonlyArray<EVENT>
  ): CommandResponse<RESULT> {
    return new CommandResponse(result, events);
  }
}
