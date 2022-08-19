import t from 'tap';
import { instance, mock, when } from 'ts-mockito';
import { Command } from '../../src/commandBus/types/Command';
import { CommandNotHandledError } from '../../src/commandBus/types/CommandNotHandledError';
import { CommandBusDispatcherMiddleware } from '../../src/commandBus/middlewares/CommandBusDispatcherMiddleware';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';
import { CommandHandler } from '../../src/commandBus/types/CommandHandler';

t.mochaGlobals();

describe('Command Dispatcher Middleware', () => {
  describe('.handle()', () => {
    class HandledCommand extends Command<string> {
      label = () => HandledCommand.name;
    }

    context('no command handler is registered for the command', () => {
      it('raises an error', () => {
        // GIVEN
        const command = new HandledCommand();

        // WHEN
        const publish = CommandBusDispatcherMiddleware.build({}).handle(command);

        // WHEN
        t.rejects(() => publish, new CommandNotHandledError(command.label()));
      });
    });

    context('a command handler is registered for the command', () => {
      it('returns the results', async () => {
        // GIVEN
        class TestDomainEvent implements DomainEvent {
          private readonly _occurredOn: Date;

          constructor() {
            this._occurredOn = new Date();
          }

          label(): string {
            return TestDomainEvent.name;
          }

          occurredOn(): Date {
            return this._occurredOn;
          }

          serialize(): SerializedDomainEvent {
            return { data: {}, occurredOn: this.occurredOn().toISOString() };
          }
        }

        const command = new HandledCommand();
        const commandHandler = mock<CommandHandler<string, HandledCommand>>();
        const expected = { events: [new TestDomainEvent()], result: 'some-result' };

        when(commandHandler.handle(command)).thenResolve(expected);

        // WHEN
        const actual = await CommandBusDispatcherMiddleware.build({
          [HandledCommand.name]: instance(commandHandler)
        }).handle(command);

        // WHEN
        t.equal(actual, expected);
      });
    });
  });
});
