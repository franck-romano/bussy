import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';
import { Middleware } from '../../common/Middleware';

export interface ChainableCommandMiddlewareHandler {
  handle: (command: Command) => Promise<CommandResponse>;
}

export interface CommandMiddleware extends Middleware<Command, CommandResponse> {}
