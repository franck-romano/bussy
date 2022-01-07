import t from 'tap';
import { instance, mock, when } from 'ts-mockito';
import { CommandMiddlewareHandler } from '../../src/commandBus/types/CommandMiddleware';
import { Command } from '../../src/commandBus/types/Command';
import { InternalCommandBus } from '../../src/commandBus/InternalCommandBus';

t.mochaGlobals();

describe('Internal Command Bus', () => {
  describe('.publish()', () => {
    it('triggers middlewares chain', async () => {
      // GIVEN
      class TestCommand implements Command {
        label = () => TestCommand.name;
      }

      const command = new TestCommand();
      const middlewareChain = mock<CommandMiddlewareHandler>();
      const expected = {
        events: [],
        result: null
      };
      when(middlewareChain.handle(command)).thenResolve(expected);

      // WHEN
      const actual = await new InternalCommandBus(instance(middlewareChain)).publish(command);

      // THEN
      t.equal(actual, expected);
    });
  });
});
