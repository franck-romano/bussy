import { CommandMiddleware } from './CommandMiddleware';
import { CommandHandlers } from '../types/CommandBus';
import { CommandNotHandledError } from '../types/CommandNotHandledError';
import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';

export class CommandBusDispatcherMiddleware<T> implements CommandMiddleware<T> {
  private constructor(private commandHandlers: CommandHandlers<T>) {}

  static build<T>(handlers: CommandHandlers<T>): CommandBusDispatcherMiddleware<T> {
    return new this(handlers);
  }

  async handle(command: Command<T>): Promise<CommandResponse<T>> {
    const commandName = command.label();
    const commandHandler = this.commandHandlers[commandName];

    if (!commandHandler) {
      throw new CommandNotHandledError(commandName);
    }

    return commandHandler.handle(command);
  }
}
