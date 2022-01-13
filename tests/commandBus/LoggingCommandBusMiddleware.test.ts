import t from 'tap';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { BusLogger } from '../../src/common/BusLogger';
import { Command } from '../../src/commandBus/types/Command';
import { CommandMiddleware } from '../../src/commandBus/middlewares/CommandMiddleware';
import { LoggingCommandBusMiddleware } from '../../src/commandBus/middlewares/LoggingCommandBusMiddleware';

t.mochaGlobals();

describe('Logging Command Bus Middleware', () => {
  describe('.chainWith()', () => {
    class TestCommand implements Command {
      label = () => TestCommand.name;
    }

    const command = new TestCommand();

    context('next middleware throws an error', () => {
      it('propagates the error', async () => {
        // GIVEN
        const logger = mock<BusLogger>();
        const middleware = mock<CommandMiddleware>();

        const expected = new Error();
        when(middleware.handle(command)).thenReject(expected);

        try {
          // WHEN
          await LoggingCommandBusMiddleware.build(instance(logger)).chainWith(instance(middleware)).handle(command);
        } catch (error) {
          // THEN
          verify(logger.info(`Executing command ${command.label()}`, deepEqual({ command }))).once();
          verify(logger.error(`Error on command ${command.label()}`, deepEqual({ error }))).once();
        }
      });
    });

    context('next middleware resolves', () => {
      it('returns the result', async () => {
        // GIVEN
        const logger = mock<BusLogger>();
        const middleware = mock<CommandMiddleware>();

        when(middleware.handle(command)).thenResolve({ events: [], result: null });

        // WHEN
        await LoggingCommandBusMiddleware.build(instance(logger)).chainWith(instance(middleware)).handle(command);

        // THEN
        verify(logger.info(`Executing command ${command.label()}`, deepEqual({ command }))).once();
        verify(logger.info(`Success on command ${command.label()}`, deepEqual({ command }))).once();
      });
    });
  });
});
