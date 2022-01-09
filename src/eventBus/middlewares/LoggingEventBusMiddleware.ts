import { EventBusMiddleware } from './EventBusMiddleware';
import { DomainEvent } from '../types/DomainEvent';
import { BusLogger } from '../../common/BusLogger';

export class LoggingEventBusMiddleware implements EventBusMiddleware {
  constructor(private logger: BusLogger) {}

  async handle(event: DomainEvent): Promise<void> {
    this.logger.info(`Processing domain event ${event.label()}`, event.serialize());
  }
}
