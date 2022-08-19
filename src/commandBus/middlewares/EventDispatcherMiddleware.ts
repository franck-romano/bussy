import { ChainableCommandMiddleware, CommandMiddleware } from './CommandMiddleware';
import { EventBus } from '../../eventBus/types/EventBus';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class EventDispatcherMiddleware<RESULT> implements CommandMiddleware<RESULT> {
  private constructor(private eventBus: EventBus, private next: CommandMiddleware<RESULT>) {}

  static build<RESULT>(eventBus: EventBus): ChainableCommandMiddleware<RESULT, EventDispatcherMiddleware<RESULT>> {
    return {
      chainWith(next: CommandMiddleware<RESULT>): EventDispatcherMiddleware<RESULT> {
        return new EventDispatcherMiddleware(eventBus, next);
      }
    };
  }

  async handle(command: Command<RESULT>): Promise<CommandResponse<RESULT>> {
    const commandResponse = await this.next.handle(command);

    this.eventBus.publish(commandResponse.events);

    return commandResponse;
  }
}
