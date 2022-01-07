import { EventBusMiddleware } from '../types/EventBusMiddleware';
import { DomainEvent } from '../types/DomainEvent';
import { BusLogger } from '../../common/BusLogger';

export class LoggingEventBusMiddleware implements EventBusMiddleware {
  constructor(private logger: BusLogger) {}

  reactTo(event: DomainEvent): void {
    this.logger.info(`Processing domain event ${event.label()}`, event.serialize());
  }
}
