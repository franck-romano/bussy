import t from 'tap';
import { instance, mock, when } from 'ts-mockito';
import { CommandMiddleware } from '../../src/commandBus/middlewares/CommandMiddleware';
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
      const middleware = mock<CommandMiddleware>();
      const expected = {
        events: [],
        result: null
      };
      when(middleware.handle(command)).thenResolve(expected);

      // WHEN
      const actual = await new InternalCommandBus(instance(middleware)).publish(command);

      // THEN
      t.equal(actual, expected);
    });
  });
});
