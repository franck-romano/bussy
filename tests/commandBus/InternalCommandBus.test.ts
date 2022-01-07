import t from 'tap';
import { instance, mock, when } from 'ts-mockito';
import { Command } from '../../src/commandBus/types/Command';
import { InternalCommandBus } from '../../src/commandBus/InternalCommandBus';
import { DomainEvent } from '../../src/eventBus/types/DomainEvent';
import { SerializedDomainEvent } from '../../src/eventBus/types/SerializedDomainEvent';
import { CommandHandler } from '../../src/commandBus/types/CommandHandler';
import { CommandNotHandledError } from '../../src/commandBus/types/CommandNotHandledError';

t.mochaGlobals();

describe('Internal Command Bus', () => {
  describe('.publish()', () => {
    context('no command handler is registered for the command', () => {
      it('raises an error', () => {
        // GIVEN
        class NotHandledCommand implements Command {
          label = () => NotHandledCommand.name;
        }

        const command = new NotHandledCommand();

        // WHEN
        const publish = new InternalCommandBus().publish(command);

        // WHEN
        t.rejects(() => publish, new CommandNotHandledError(command.label()));
      });
    });

    context('a command handler is registered for the command', () => {
      it('returns the results', async () => {
        // GIVEN
        class HandledCommand implements Command {
          label = () => HandledCommand.name;
        }

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
        const commandHandler = mock<CommandHandler<HandledCommand>>();
        const expected = [new TestDomainEvent()];

        // WHEN
        when(commandHandler.handle(command)).thenResolve(expected);

        const actual = await new InternalCommandBus()
          .registerCommandHandlers({
            [HandledCommand.name]: instance(commandHandler)
          })
          .publish(command);

        // WHEN
        t.equal(actual, expected);
      });
    });
  });
});
