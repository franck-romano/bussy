import { BusLogger } from '../../common/BusLogger';
import { ChainableCommandMiddleware, CommandMiddleware } from './CommandMiddleware';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class LoggingCommandBusMiddleware<RESULT> implements CommandMiddleware<RESULT> {
  private constructor(private logger: BusLogger, private next: CommandMiddleware<RESULT>) {}

  static build<T>(logger: BusLogger): ChainableCommandMiddleware<T, LoggingCommandBusMiddleware<T>> {
    return {
      chainWith(next: CommandMiddleware<T>): LoggingCommandBusMiddleware<T> {
        return new LoggingCommandBusMiddleware(logger, next);
      }
    };
  }

  async handle(command: Command<RESULT>): Promise<CommandResponse<RESULT>> {
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
