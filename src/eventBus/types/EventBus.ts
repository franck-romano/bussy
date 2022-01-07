import { EventHandler } from './EventHandler';
import { EventMiddleware } from './EventMiddleware';
import { Bus } from '../../common/Bus';
import { DomainEvent } from './DomainEvent';

export type EventHandlers = { [event: string]: EventHandler<DomainEvent>[] };

export interface EventBus extends Bus<DomainEvent, void> {
  publish(events: DomainEvent[]): void;

  registerEventHandlers(eventHandlers: EventHandlers): EventBus;

  registerMiddlewares(middlewares: EventMiddleware[]): EventBus;
}
