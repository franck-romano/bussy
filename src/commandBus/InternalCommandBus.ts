import { DomainEvent } from '../eventBus/types/DomainEvent';
import { CommandNotHandledError } from './types/CommandNotHandledError';
import { Command } from './types/Command';
import { CommandBus, CommandHandlers } from './types/CommandBus';

export class InternalCommandBus implements CommandBus {
  private commandHandlers: CommandHandlers = {};

  registerCommandHandlers(commandHandlers: CommandHandlers): CommandBus {
    this.commandHandlers = commandHandlers;
    return this;
  }

  async publish(command: Command): Promise<Readonly<DomainEvent[]>> {
    const commandLabel = command.label();
    const commandHandler = this.commandHandlers[commandLabel];

    if (!commandHandler) {
      throw new CommandNotHandledError(commandLabel);
    }

    return await commandHandler.handle(command);
  }
}
