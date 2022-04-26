import { Command } from './Command';
import { CommandResponse } from './CommandResponse';

export interface CommandHandler<RESULT, COMMAND extends Command<RESULT>> {
  name(): string;

  handle(command: COMMAND): Promise<CommandResponse<RESULT>>;
}
