import { ChainableCommandMiddleware, CommandMiddleware } from './CommandMiddleware';
import { EventBus } from '../../eventBus/types/EventBus';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class EventDispatcherMiddleware<T> implements CommandMiddleware<T> {
  private constructor(private eventBus: EventBus, private next: CommandMiddleware<T>) {}

  static build<T>(eventBus: EventBus): ChainableCommandMiddleware<T, EventDispatcherMiddleware<T>> {
    return {
      chainWith(next: CommandMiddleware<T>): EventDispatcherMiddleware<T> {
        return new EventDispatcherMiddleware(eventBus, next);
      }
    };
  }

  async handle(command: Command<T>): Promise<CommandResponse<T>> {
    const commandResponse = await this.next.handle(command);

    this.eventBus.publish(commandResponse.events);

    return commandResponse;
  }
}
