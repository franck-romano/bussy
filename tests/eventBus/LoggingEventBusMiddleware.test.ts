import t from 'tap';
import { BusLogger } from '../../src/common/BusLogger';
import { deepEqual, instance, mock, verify } from 'ts-mockito';
import { LoggingEventBusMiddleware } from '../../src/eventBus/middlewares/LoggingEventBusMiddleware';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';

t.mochaGlobals();

describe('Logging Query Bus Middleware', () => {
  describe('.reactTo()', () => {
    it('logs incoming domain events', () => {
      // GIVEN
      class DummyEvent implements DomainEvent {
        label = () => DummyEvent.name;
        occurredOn = () => new Date();
        serialize = (): SerializedDomainEvent => ({
          occurredOn: 'some-date',
          data: {}
        });
      }

      const dummyEvent = new DummyEvent();
      const logger = mock<BusLogger>();

      // WHEN
      new LoggingEventBusMiddleware(instance(logger)).reactTo(dummyEvent);

      // THEN
      verify(logger.info(`Processing domain event ${dummyEvent.label()}`, deepEqual(dummyEvent.serialize()))).once();
    });
  });
});
