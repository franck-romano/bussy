import { CommandMiddleware } from '../types/CommandMiddleware';
import { CommandHandlers } from '../types/CommandBus';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';
import { CommandNotHandledError } from '../types/CommandNotHandledError';

export class CommandBusDispatcherMiddleware implements CommandMiddleware {
  constructor(private commandHandlers: CommandHandlers) {}

  async handle(command: Command): Promise<CommandResponse> {
    const commandName = command.label();
    const commandHandler = this.commandHandlers[commandName];

    if (!commandHandler) {
      throw new CommandNotHandledError(commandName);
    }

    return commandHandler.handle(command);
  }
}
