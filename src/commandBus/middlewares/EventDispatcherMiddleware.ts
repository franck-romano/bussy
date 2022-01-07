import { CommandMiddleware, CommandMiddlewareHandler } from '../types/CommandMiddleware';
import { EventBus } from '../../eventBus/types/EventBus';

export class EventDispatcherMiddleware implements CommandMiddleware {
  constructor(private eventBus: EventBus) {}

  chainWith(nextMiddleware: CommandMiddlewareHandler): CommandMiddlewareHandler {
    return {
      handle: async (command) => {
        const commandResponse = await nextMiddleware.handle(command);

        this.eventBus.publish(commandResponse.events);

        return commandResponse;
      }
    };
  }
}
