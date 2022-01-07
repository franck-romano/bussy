import { EventMiddleware } from '../types/EventMiddleware';
import { DomainEvent } from '../types/DomainEvent';
import { BusLogger } from '../../common/BusLogger';

export class DefaultEventBusLoggingMiddleware implements EventMiddleware {
  constructor(private logger: BusLogger) {}

  reactTo(event: DomainEvent): void {
    this.logger.info(`Processing domain event ${event.label()}`, event.serialize());
  }
}
