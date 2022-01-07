import { Command } from './types/Command';
import { CommandBus } from './types/CommandBus';
import { CommandResponse } from './types/CommandResponse';
import { CommandMiddleware } from './types/CommandMiddleware';

export class InternalCommandBus implements CommandBus {
  constructor(private middlewareChain: CommandMiddleware) {}

  async publish(command: Command): Promise<CommandResponse> {
    return this.middlewareChain.handle(command);
  }
}
