import t from 'tap';
import { QueryBusDispatcherMiddleware } from '../../src/queryBus/middlewares/QueryBusDispatcherMiddleware';
import { Query } from '../../src/queryBus/types/Query';
import { QueryNotHandledError } from '../../src/queryBus/types/QueryNotHandledError';
import { instance, mock, when } from 'ts-mockito';
import { QueryHandler } from '../../src/queryBus/types/QueryHandler';

t.mochaGlobals();

describe('Query Dispatcher Middleware', () => {
  describe('.handle()', () => {
    context('no query handler for the query', () => {
      it('raises an error', async () => {
        // GIVEN
        class NotHandledQuery extends Query<void> {
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
        class HandledQuery extends Query<boolean> {
          label = () => HandledQuery.name;
        }

        const query = new HandledQuery();

        const queryHandler = mock<QueryHandler<boolean, HandledQuery>>();
        when(queryHandler.handle(query)).thenResolve(true);

        // WHEN
        const actual = await QueryBusDispatcherMiddleware.build({ [HandledQuery.name]: instance(queryHandler) }).handle(
          query
        );

        // THEN
        t.equal(actual, true);
      });
    });
  });
});
