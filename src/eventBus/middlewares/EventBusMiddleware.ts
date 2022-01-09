import { DomainEvent } from '../types/DomainEvent';
import { Middleware } from '../../common/Middleware';

export interface EventBusMiddleware extends Middleware<DomainEvent, void> {}
