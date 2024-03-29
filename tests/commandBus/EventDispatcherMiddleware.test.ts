import t from 'tap';
import { instance, mock, verify, when } from 'ts-mockito';
import { CommandMiddleware } from '../../src/commandBus/middlewares/CommandMiddleware';
import { EventBus } from '../../src/eventBus/types/EventBus';
import { EventDispatcherMiddleware } from '../../src/commandBus/middlewares/EventDispatcherMiddleware';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';
import { VoidCommand } from '../../src/commandBus/types/VoidCommand';

t.mochaGlobals();

describe('Event Dispatcher Middleware', () => {
  describe('.handle()', () => {
    class TestCommand extends VoidCommand {
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
      const middleware = mock<CommandMiddleware<void>>();

      const events = [new DummyEvent()];
      when(middleware.handle(command)).thenResolve({ events, result: undefined });

      // WHEN
      await EventDispatcherMiddleware.build(instance(eventBus)).chainWith(instance(middleware)).handle(command);

      // THEN
      verify(middleware.handle(command)).calledBefore(eventBus.publish(events));
    });
  });
});
