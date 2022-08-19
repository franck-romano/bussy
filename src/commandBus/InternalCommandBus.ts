import { Command } from './types/Command';
import { CommandBus } from './types/CommandBus';
import { CommandResponse } from './types/CommandResponse';
import { CommandMiddleware } from './middlewares/CommandMiddleware';

export class InternalCommandBus<RESULT> implements CommandBus {
  constructor(private middlewareChain: CommandMiddleware<RESULT>) {}

  async publish(command: Command<RESULT>): Promise<CommandResponse<RESULT>> {
    return this.middlewareChain.handle(command);
  }
}
