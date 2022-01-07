import { BusLogger } from '../../common/BusLogger';
import { CommandMiddleware } from '../types/CommandMiddleware';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class LoggingCommandBusMiddleware implements CommandMiddleware {
  constructor(private nextMiddleware: CommandMiddleware, private logger: BusLogger) {}

  async handle(command: Command): Promise<CommandResponse> {
    this.logger.info(`Executing command ${command.label()}`, { command });
    try {
      const result = await this.nextMiddleware.handle(command);
      this.logger.info(`Success on command ${command.label()}`, { command });

      return result;
    } catch (error) {
      this.logger.error(`Error on command ${command.label()}`, { error });
      throw error;
    }
  }
}
