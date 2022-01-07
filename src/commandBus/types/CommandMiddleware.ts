import { Command } from './Command';
import { CommandResponse } from './CommandResponse';

export abstract class CommandMiddleware {
  public abstract handle(command: Command): Promise<CommandResponse>;
}
