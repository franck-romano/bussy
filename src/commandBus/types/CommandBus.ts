import { Bus } from '../../common/Bus';
import { Command } from './Command';
import { DomainEvent } from '../../eventBus/types/DomainEvent';
import { CommandHandler } from './CommandHandler';

export type CommandHandlers = { [commandLabel: string]: CommandHandler<Command> };

export interface CommandBus extends Bus<Command, Readonly<DomainEvent[]>> {
  registerCommandHandlers(commandHandlers: CommandHandlers): CommandBus;
}
