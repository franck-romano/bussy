import t from 'tap';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';
import { InternalEventBus } from '../../src/eventBus/InternalEventBus';
import { EventNotHandledError } from '../../src/eventBus/EventNotHandledError';
import { EventHandler } from '../../src/eventBus/types/EventHandler';
import { instance, mock, verify } from 'ts-mockito';
import { EventMiddleware } from '../../src/eventBus/types/EventMiddleware';

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
    context('no event handlers are registered for the event', () => {
      it('raises an error', () => {
        // GIVEN
        const event = new DummyEvent();

        // WHEN & THEN
        t.throws(() => new InternalEventBus().publish([event]), new EventNotHandledError(event.label()));
      });
    });

    context('event handlers are registered for some events', () => {
      const event = new DummyEvent();
      const otherEvent = new OtherDummyEvent();

      it('calls the corresponding event handlers', () => {
        // GIVEN
        const eventHandler = mock<EventHandler<DummyEvent>>();
        const eventHandlers = {
          [DummyEvent.name]: [instance(eventHandler)],
          [OtherDummyEvent.name]: [instance(eventHandler)]
        };

        // WHEN
        new InternalEventBus().registerEventHandlers(eventHandlers).publish([event, otherEvent]);

        // THEN
        verify(eventHandler.reactTo(event)).once();
        verify(eventHandler.reactTo(otherEvent)).once();
      });

      context('sames event is published twice', () => {
        it('calls the corresponding event handlers twice', () => {
          // GIVEN
          const eventHandler = mock<EventHandler<DummyEvent>>();
          const eventHandlers = {
            [DummyEvent.name]: [instance(eventHandler)],
            [OtherDummyEvent.name]: [instance(eventHandler)]
          };

          // WHEN
          new InternalEventBus().registerEventHandlers(eventHandlers).publish([event, event]);

          // THEN
          verify(eventHandler.reactTo(event)).twice();
        });
      });

      context('some middlewares are registered', () => {
        it('chains middlewares based on registration order', () => {
          // GIVEN
          const firstEventMiddleware = mock<EventMiddleware>();
          const secondEventMiddleware = mock<EventMiddleware>();

          const eventHandler = mock<EventHandler<DummyEvent>>();
          const eventHandlers = {
            [DummyEvent.name]: [instance(eventHandler)]
          };

          const eventBus = new InternalEventBus()
            .registerEventHandlers(eventHandlers)
            .registerMiddlewares([instance(firstEventMiddleware), instance(secondEventMiddleware)]);

          // WHEN
          eventBus.publish([event]);

          // THEN
          verify(firstEventMiddleware.reactTo(event)).calledBefore(secondEventMiddleware.reactTo(event));
        });
      });
    });
  });
});
