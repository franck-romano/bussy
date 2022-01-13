import t from 'tap';
import { Query } from '../../src/queryBus/types/Query';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { BusLogger } from '../../src/common/BusLogger';
import { ReadModel } from '../../src/queryBus/types/ReadModel';
import { LoggingQueryBusMiddleware } from '../../src/queryBus/middlewares/LoggingQueryBusMiddleware';
import { QueryMiddleware } from '../../src/queryBus/middlewares/QueryMiddleware';

t.mochaGlobals();

describe('Logging Query Bus Middleware', () => {
  describe('.handle()', () => {
    class TestQuery implements Query {
      label = () => TestQuery.name;
    }

    const query = new TestQuery();

    context('next middleware throws an error', () => {
      it('propagates the error', async () => {
        // GIVEN
        const logger = mock<BusLogger>();
        const middleware = mock<QueryMiddleware>();

        const expected = new Error();
        when(middleware.handle(query)).thenReject(expected);

        try {
          // WHEN
          await LoggingQueryBusMiddleware.build(instance(logger)).chainWith(instance(middleware)).handle(query);
        } catch (error) {
          // THEN
          verify(logger.info(`Executing query ${query.label()}`, deepEqual({ query }))).once();
          verify(logger.error(`Error on query ${query.label()}`, deepEqual({ error }))).once();
        }
      });
    });

    context('next middleware resolves', () => {
      it('returns the result', async () => {
        // GIVEN
        const logger = mock<BusLogger>();
        const middleware = mock<QueryMiddleware>();

        class TestReadModel implements ReadModel {}

        const expected = new TestReadModel();
        when(middleware.handle(query)).thenResolve(expected);

        // WHEN
        await LoggingQueryBusMiddleware.build(instance(logger)).chainWith(instance(middleware)).handle(query);

        // THEN
        verify(logger.info(`Executing query ${query.label()}`, deepEqual({ query }))).once();
        verify(logger.info(`Success on query ${query.label()}`, deepEqual({ query }))).once();
      });
    });
  });
});
