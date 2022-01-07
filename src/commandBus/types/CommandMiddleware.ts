import { CommandResponse } from './CommandResponse';
import { Command } from './Command';

export interface CommandMiddlewareHandler {
  handle: (command: Command) => Promise<CommandResponse>;
}

export interface CommandMiddleware {
  chainWith(nextMiddleware: CommandMiddlewareHandler | null): CommandMiddlewareHandler;
}
