import { EventHandler } from './EventHandler';
import { EventBusMiddleware } from './EventBusMiddleware';
import { Bus } from '../../common/Bus';
import { DomainEvent } from './DomainEvent';

export type EventHandlers = { [event: string]: EventHandler<DomainEvent>[] };

export interface EventBus extends Bus<DomainEvent, void> {
  publish(events: Readonly<DomainEvent[]>): void;

  registerEventHandlers(eventHandlers: EventHandlers): EventBus;

  registerMiddlewares(middlewares: EventBusMiddleware[]): EventBus;
}
