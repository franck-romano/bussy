import { EventHandler } from './EventHandler';
import { Bus } from '../../common/Bus';
import { DomainEvent } from './DomainEvent';

export type EventHandlers = { [event: string]: EventHandler<DomainEvent>[] };

export interface EventBus extends Bus<DomainEvent, void> {}
