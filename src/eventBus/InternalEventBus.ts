import { DomainEvent } from './types/DomainEvent';
import { EventBus, EventHandlers } from './types/EventBus';
import { EventMiddleware } from './types/EventMiddleware';
import { EventNotHandledError } from './EventNotHandledError';

export class InternalEventBus implements EventBus {
  private eventsHandlers: EventHandlers = {};
  private eventMiddlewares: EventMiddleware[] = [];

  registerEventHandlers(eventHandlers: EventHandlers): EventBus {
    this.eventsHandlers = eventHandlers;
    return this;
  }

  registerMiddlewares(eventMiddlewares: EventMiddleware[]): EventBus {
    this.eventMiddlewares = eventMiddlewares;
    return this;
  }

  publish(events: Readonly<DomainEvent>[]): void {
    events.reduce((domainEvents, event) => {
      const correspondingEventHandlers = this.eventsHandlers[event.label()];

      if (!correspondingEventHandlers) {
        throw new EventNotHandledError(event.label());
      }

      this.eventMiddlewares.forEach((middleware) => middleware.reactTo(event));

      Promise.allSettled(
        correspondingEventHandlers.map((eventHandler) => {
          eventHandler.reactTo(event);
        })
      );

      return domainEvents.slice(events.indexOf(event));
    }, events);
  }
}
