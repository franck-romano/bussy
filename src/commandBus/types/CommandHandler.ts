import { DomainEvent } from '../../eventBus/types/DomainEvent';

export interface CommandHandler<Command> {
  name(): string;

  handle(command: Command): Promise<Readonly<DomainEvent[]>>;
}
