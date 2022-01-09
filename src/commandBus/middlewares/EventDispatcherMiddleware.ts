import { CommandMiddleware } from './CommandMiddleware';
import { EventBus } from '../../eventBus/types/EventBus';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class EventDispatcherMiddleware implements CommandMiddleware {
  constructor(private eventBus: EventBus, private next: CommandMiddleware) {}

  async handle(command: Command): Promise<CommandResponse> {
    const commandResponse = await this.next.handle(command);

    this.eventBus.publish(commandResponse.events);

    return commandResponse;
  }
}
