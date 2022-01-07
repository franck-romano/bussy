import { Command } from './Command';
import { CommandResponse } from './CommandResponse';

export interface CommandMiddleware {
  handle(command: Command): Promise<CommandResponse>;
}
