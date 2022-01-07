import { Command } from './types/Command';
import { CommandBus } from './types/CommandBus';
import { CommandResponse } from './types/CommandResponse';
import { CommandMiddlewareHandler } from './middlewares/CommandMiddleware';

export class InternalCommandBus implements CommandBus {
  constructor(private middlewareChain: CommandMiddlewareHandler) {}

  async publish(command: Command): Promise<CommandResponse> {
    return this.middlewareChain.handle(command);
  }
}
