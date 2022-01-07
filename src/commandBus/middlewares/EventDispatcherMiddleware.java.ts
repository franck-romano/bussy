import { CommandMiddleware } from '../types/CommandMiddleware';
import { EventBus } from '../../eventBus/types/EventBus';
import { Command } from '../types/Command';
import { CommandResponse } from '../types/CommandResponse';

export class EventDispatcherMiddleware extends CommandMiddleware {
  constructor(private eventBus: EventBus, private nextMiddleware: CommandMiddleware) {
    super();
  }

  async handle(command: Command): Promise<CommandResponse> {
    const commandResponse = await this.nextMiddleware.handle(command);

    this.eventBus.publish(commandResponse.events);

    return commandResponse;
  }
}
