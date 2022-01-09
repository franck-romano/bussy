import { BusLogger } from '../../common/BusLogger';
import { CommandMiddleware } from './CommandMiddleware';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class LoggingCommandBusMiddleware implements CommandMiddleware {
  constructor(private logger: BusLogger, private next: CommandMiddleware) {}

  async handle(command: Command): Promise<CommandResponse> {
    this.logger.info(`Executing command ${command.label()}`, { command });
    try {
      const result = await this.next.handle(command);
      this.logger.info(`Success on command ${command.label()}`, { command });

      return result;
    } catch (error) {
      this.logger.error(`Error on command ${command.label()}`, { error });
      throw error;
    }
  }
}
