import { DomainEvent } from './types/DomainEvent';
import { EventBus, EventHandlers } from './types/EventBus';
import { EventMiddleware } from './types/EventMiddleware';
import { EventNotHandledError } from './EventNotHandledError';
import { BusLogger } from '../common/BusLogger';
import { EventHandler } from './types/EventHandler';

export class InternalEventBus implements EventBus {
  private eventsHandlers: EventHandlers = {};
  private eventMiddlewares: EventMiddleware[] = [];

  constructor(private logger: BusLogger) {}

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
          eventHandler
            .reactTo(event)
            .then(() => this.logOnSuccess(event, eventHandler))
            .catch((error) => this.logOnError(event, eventHandler, error));
        })
      );

      return domainEvents.slice(events.indexOf(event));
    }, events);
  }

  private logOnSuccess(event: DomainEvent, eventHandler: EventHandler<DomainEvent>) {
    this.logger.info(`Event: ${event.label()} successfully processed by ${eventHandler.name()}`, {
      event: event.serialize()
    });
  }

  private logOnError(event: DomainEvent, eventHandler: EventHandler<DomainEvent>, error: Error) {
    this.logger.error(`Event: ${event.label()} unsuccessfully processed by ${eventHandler.name()}`, {
      error,
      event: event.serialize()
    });
  }
}
