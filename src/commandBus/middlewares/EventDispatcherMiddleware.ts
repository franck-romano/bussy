import { ChainableCommandMiddleware, CommandMiddleware } from './CommandMiddleware';
import { EventBus } from '../../eventBus/types/EventBus';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class EventDispatcherMiddleware implements CommandMiddleware {
  private constructor(private eventBus: EventBus, private next: CommandMiddleware) {}

  static build(eventBus: EventBus): ChainableCommandMiddleware<EventDispatcherMiddleware> {
    return {
      chainWith(next: CommandMiddleware): EventDispatcherMiddleware {
        return new EventDispatcherMiddleware(eventBus, next);
      }
    };
  }

  async handle(command: Command): Promise<CommandResponse> {
    const commandResponse = await this.next.handle(command);

    this.eventBus.publish(commandResponse.events);

    return commandResponse;
  }
}
