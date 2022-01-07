import { CommandMiddleware, ChainableCommandMiddlewareHandler } from './CommandMiddleware';
import { EventBus } from '../../eventBus/types/EventBus';

export class EventDispatcherMiddleware implements CommandMiddleware {
  constructor(private eventBus: EventBus) {}

  chainWith(nextMiddleware: ChainableCommandMiddlewareHandler): ChainableCommandMiddlewareHandler {
    return {
      handle: async (command) => {
        const commandResponse = await nextMiddleware.handle(command);

        this.eventBus.publish(commandResponse.events);

        return commandResponse;
      }
    };
  }
}
