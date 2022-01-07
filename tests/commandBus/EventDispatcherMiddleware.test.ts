import t from 'tap';
import { instance, mock, verify, when } from 'ts-mockito';
import { Command } from '../../src/commandBus/types/Command';
import { CommandMiddleware } from '../../src/commandBus/types/CommandMiddleware';
import { EventBus } from '../../src/eventBus/types/EventBus';
import { EventDispatcherMiddleware } from '../../src/commandBus/middlewares/EventDispatcherMiddleware.java';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';

t.mochaGlobals();

describe('Event Dispatcher Middleware', () => {
  describe('.handle()', () => {
    class TestCommand implements Command {
      label = () => TestCommand.name;
    }

    class DummyEvent implements DomainEvent {
      label = () => DummyEvent.name;
      occurredOn = () => new Date();
      serialize = (): SerializedDomainEvent => ({
        occurredOn: this.occurredOn().toISOString(),
        data: {}
      });
    }

    const command = new TestCommand();

    it('executes the command and publish the events', async () => {
      // GIVEN
      const eventBus = mock<EventBus>();
      const middleware = mock<CommandMiddleware>();

      const events = [new DummyEvent()];
      when(middleware.handle(command)).thenResolve({ events, result: null });

      // WHEN
      await new EventDispatcherMiddleware(instance(eventBus), instance(middleware)).handle(command);

      // THEN
      verify(middleware.handle(command)).calledBefore(eventBus.publish(events));
    });
  });
});
