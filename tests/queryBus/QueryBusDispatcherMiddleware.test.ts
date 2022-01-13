import t from 'tap';
import { QueryBusDispatcherMiddleware } from '../../src/queryBus/middlewares/QueryBusDispatcherMiddleware';
import { Query } from '../../src/queryBus/types/Query';
import { QueryNotHandledError } from '../../src/queryBus/types/QueryNotHandledError';
import { ReadModel } from '../../src/queryBus/types/ReadModel';
import { instance, mock, when } from 'ts-mockito';
import { QueryHandler } from '../../src/queryBus/types/QueryHandler';

t.mochaGlobals();

describe('Query Dispatcher Middleware', () => {
  describe('.handle()', () => {
    context('no query handler for the query', () => {
      it('raises an error', async () => {
        // GIVEN
        class NotHandledQuery implements Query {
          label = () => NotHandledQuery.name;
        }

        const query = new NotHandledQuery();

        // WHEN
        const publish = QueryBusDispatcherMiddleware.build({}).handle(query);

        // WHEN
        t.rejects(() => publish, new QueryNotHandledError(query.label()));
      });
    });

    context('a query handler exists for the query', () => {
      it('returns the result', async () => {
        // GIVEN
        class HandledQuery implements Query {
          label = () => HandledQuery.name;
        }

        class TestReadModel implements ReadModel {}

        const query = new HandledQuery();
        const expected = new TestReadModel();

        const queryHandler = mock<QueryHandler<HandledQuery>>();
        when(queryHandler.handle(query)).thenResolve(expected);

        // WHEN
        const actual = await QueryBusDispatcherMiddleware.build({ [HandledQuery.name]: instance(queryHandler) }).handle(
          query
        );

        // THEN
        t.equal(actual, expected);
      });
    });
  });
});
