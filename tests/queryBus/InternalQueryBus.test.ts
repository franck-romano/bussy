import t from 'tap';
import { Query } from '../../src/queryBus/types/Query';
import { InternalQueryBus } from '../../src/queryBus/InternalQueryBus';
import { QueryNotHandledError } from '../../src/queryBus/types/QueryNotHandledError';
import { instance, mock, when } from 'ts-mockito';
import { QueryHandler } from '../../src/queryBus/types/QueryHandler';
import { ReadModel } from '../../src/queryBus/types/ReadModel';

t.mochaGlobals();

describe('Internal Query Bus', () => {
  describe('.publish()', () => {
    context('no query handler is registered for the query', () => {
      it('raises an error', () => {
        // GIVEN
        class NotHandledQuery implements Query {
          label = () => NotHandledQuery.name;
        }

        const query = new NotHandledQuery();

        // WHEN
        const publish = new InternalQueryBus().publish(query);

        // WHEN
        t.rejects(() => publish, new QueryNotHandledError(query.label()));
      });
    });

    context('a query handler is registered for the query', () => {
      it('returns the results', async () => {
        // GIVEN
        class HandledQuery implements Query {
          label = () => HandledQuery.name;
        }

        class TestReadModel implements ReadModel {}

        const query = new HandledQuery();
        const queryHandler = mock<QueryHandler<HandledQuery>>();
        const expected = new TestReadModel();

        // WHEN
        when(queryHandler.handle(query)).thenResolve(expected);

        const actual = await new InternalQueryBus()
          .registerQueryHandlers({
            [HandledQuery.name]: instance(queryHandler)
          })
          .publish(query);

        // WHEN
        t.equal(actual, expected);
      });
    });
  });
});
