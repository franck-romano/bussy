import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';

export interface ChainableCommandMiddlewareHandler {
  handle: (command: Command) => Promise<CommandResponse>;
}

export interface CommandMiddleware {
  chainWith(nextMiddleware: ChainableCommandMiddlewareHandler | null): ChainableCommandMiddlewareHandler;
}
