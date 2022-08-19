import t from 'tap';
import { instance, mock, when } from 'ts-mockito';
import { CommandMiddleware } from '../../src/commandBus/middlewares/CommandMiddleware';
import { InternalCommandBus } from '../../src/commandBus/InternalCommandBus';
import { VoidCommand } from '../../src/commandBus/types/VoidCommand';

t.mochaGlobals();

describe('Internal Command Bus', () => {
  describe('.publish()', () => {
    it('triggers middlewares chain', async () => {
      // GIVEN
      class TestCommand extends VoidCommand {
        label = () => TestCommand.name;
      }

      const command = new TestCommand();
      const middleware = mock<CommandMiddleware<void>>();
      const expected = {
        events: [],
        result: undefined
      };
      when(middleware.handle(command)).thenResolve(expected);

      // WHEN
      const actual = await new InternalCommandBus(instance(middleware)).publish(command);

      // THEN
      t.equal(actual, expected);
    });
  });
});
