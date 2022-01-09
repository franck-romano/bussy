import t from 'tap';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';
import { InternalEventBus } from '../../src/eventBus/InternalEventBus';
import { EventNotHandledError } from '../../src/eventBus/types/EventNotHandledError';
import { EventHandler } from '../../src/eventBus/types/EventHandler';
import { instance, mock, verify, when } from 'ts-mockito';
import { EventBusMiddleware } from '../../src/eventBus/middlewares/EventBusMiddleware';
import { BusLogger } from '../../src/common/BusLogger';

t.mochaGlobals();

describe('Internal Event Bus', () => {
  class DummyEvent implements DomainEvent {
    label = () => DummyEvent.name;
    occurredOn = () => new Date();
    serialize = (): SerializedDomainEvent => ({
      occurredOn: this.occurredOn().toISOString(),
      data: {}
    });
  }

  class OtherDummyEvent implements DomainEvent {
    label = () => OtherDummyEvent.name;
    occurredOn = () => new Date();
    serialize = (): SerializedDomainEvent => ({
      occurredOn: this.occurredOn().toISOString(),
      data: {}
    });
  }

  describe('.publish()', () => {
    const event = new DummyEvent();
    const otherEvent = new OtherDummyEvent();

    let logger: BusLogger;
    let dummyEventEventHandler: EventHandler<DummyEvent>;

    beforeEach(() => {
      logger = mock<BusLogger>();
      dummyEventEventHandler = mock<EventHandler<DummyEvent>>();
      when(dummyEventEventHandler.reactTo(event)).thenResolve();
      when(dummyEventEventHandler.reactTo(otherEvent)).thenResolve();
    });

    context('no event handlers are registered for the event', () => {
      it('raises an error', () => {
        t.throws(() => new InternalEventBus(logger, [], {}).publish([event]), new EventNotHandledError(event.label()));
      });
    });

    context('event handlers are registered for some events', () => {
      it('calls the corresponding event handlers', () => {
        // GIVEN
        const eventHandlers = {
          [DummyEvent.name]: [instance(dummyEventEventHandler)],
          [OtherDummyEvent.name]: [instance(dummyEventEventHandler)]
        };

        // WHEN
        new InternalEventBus(instance(logger), [], eventHandlers).publish([event, otherEvent]);

        // THEN
        verify(dummyEventEventHandler.reactTo(event)).once();
        verify(dummyEventEventHandler.reactTo(otherEvent)).once();
      });

      context('event handler has failed', () => {
        it('does not throw the error', () => {
          // GIVEN
          const error = new Error();
          const eventHandlers = {
            [DummyEvent.name]: [instance(dummyEventEventHandler)]
          };

          when(dummyEventEventHandler.reactTo(event)).thenReject(error);

          // WHEN
          try {
            new InternalEventBus(instance(logger), [], eventHandlers).publish([event]);
          } catch (error) {
            // THEN
            t.equal(error, null);
          }
        });
      });

      context('sames event is published twice', () => {
        it('calls the corresponding event handlers twice', () => {
          // GIVEN
          const eventHandlers = {
            [DummyEvent.name]: [instance(dummyEventEventHandler)],
            [OtherDummyEvent.name]: [instance(dummyEventEventHandler)]
          };

          // WHEN
          new InternalEventBus(instance(logger), [], eventHandlers).publish([event, event]);

          // THEN
          verify(dummyEventEventHandler.reactTo(event)).twice();
        });
      });

      context('some middlewares are registered', () => {
        it('chains middlewares based on registration order', () => {
          // GIVEN
          const firstEventMiddleware = mock<EventBusMiddleware>();
          const secondEventMiddleware = mock<EventBusMiddleware>();

          const middlewares = [instance(firstEventMiddleware), instance(secondEventMiddleware)];
          const eventHandlers = {
            [DummyEvent.name]: [instance(dummyEventEventHandler)]
          };

          // WHEN
          new InternalEventBus(instance(logger), middlewares, eventHandlers).publish([event]);

          // THEN
          verify(firstEventMiddleware.handle(event)).calledBefore(secondEventMiddleware.handle(event));
        });
      });
    });
  });
});
