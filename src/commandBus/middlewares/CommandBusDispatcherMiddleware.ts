import { CommandMiddleware, ChainableCommandMiddlewareHandler } from './CommandMiddleware';
import { CommandHandlers } from '../types/CommandBus';
import { CommandNotHandledError } from '../types/CommandNotHandledError';
import { CommandResponse } from '../types/CommandResponse';

export class CommandBusDispatcherMiddleware implements CommandMiddleware {
  constructor(private commandHandlers: CommandHandlers) {}

  chainWith(): ChainableCommandMiddlewareHandler {
    return {
      handle: async (command): Promise<CommandResponse> => {
        const commandName = command.label();
        const commandHandler = this.commandHandlers[commandName];

        if (!commandHandler) {
          throw new CommandNotHandledError(commandName);
        }

        return commandHandler.handle(command);
      }
    };
  }
}
