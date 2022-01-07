import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';

export interface CommandMiddlewareHandler {
  handle: (command: Command) => Promise<CommandResponse>;
}

export interface CommandMiddleware {
  chainWith(nextMiddleware: CommandMiddlewareHandler | null): CommandMiddlewareHandler;
}
