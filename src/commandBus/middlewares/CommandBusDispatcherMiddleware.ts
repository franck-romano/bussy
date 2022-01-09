import { CommandMiddleware } from './CommandMiddleware';
import { CommandHandlers } from '../types/CommandBus';
import { CommandNotHandledError } from '../types/CommandNotHandledError';
import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';

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
