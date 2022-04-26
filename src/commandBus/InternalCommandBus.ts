import { Command } from './types/Command';
import { CommandBus } from './types/CommandBus';
import { CommandResponse } from './types/CommandResponse';
import { CommandMiddleware } from './middlewares/CommandMiddleware';

export class InternalCommandBus<T> implements CommandBus {
  constructor(private middlewareChain: CommandMiddleware<T>) {}

  async publish(command: Command<T>): Promise<CommandResponse<T>> {
    return this.middlewareChain.handle(command);
  }
}
