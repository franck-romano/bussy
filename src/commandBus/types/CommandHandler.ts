import { CommandResponse } from './CommandResponse';
import { Command } from './Command';

export interface CommandHandler<COMMAND extends Command> {
  name(): string;

  handle(command: COMMAND): Promise<CommandResponse>;
}
