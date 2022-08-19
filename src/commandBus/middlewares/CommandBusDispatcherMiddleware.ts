import { CommandMiddleware } from './CommandMiddleware';
import { CommandHandlers } from '../types/CommandBus';
import { CommandNotHandledError } from '../types/CommandNotHandledError';
import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';

export class CommandBusDispatcherMiddleware<RESULT> implements CommandMiddleware<RESULT> {
  private constructor(private commandHandlers: CommandHandlers<RESULT>) {}

  static build<RESULT>(handlers: CommandHandlers<RESULT>): CommandBusDispatcherMiddleware<RESULT> {
    return new this(handlers);
  }

  async handle(command: Command<RESULT>): Promise<CommandResponse<RESULT>> {
    const commandName = command.label();
    const commandHandler = this.commandHandlers[commandName];

    if (!commandHandler) {
      throw new CommandNotHandledError(commandName);
    }

    return commandHandler.handle(command);
  }
}
