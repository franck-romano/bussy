import { BusLogger } from '../../common/BusLogger';
import { CommandMiddleware, CommandMiddlewareHandler } from './CommandMiddleware';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class LoggingCommandBusMiddleware implements CommandMiddleware {
  constructor(private logger: BusLogger) {}

  chainWith(nextMiddleware: CommandMiddlewareHandler): CommandMiddlewareHandler {
    return {
      handle: async (command: Command): Promise<CommandResponse> => {
        this.logger.info(`Executing command ${command.label()}`, { command });
        try {
          const result = await nextMiddleware.handle(command);
          this.logger.info(`Success on command ${command.label()}`, { command });

          return result;
        } catch (error) {
          this.logger.error(`Error on command ${command.label()}`, { error });
          throw error;
        }
      }
    };
  }
}
