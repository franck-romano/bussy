import t from 'tap';
import { Query } from '../../src/queryBus/types/Query';
import { InternalQueryBus } from '../../src/queryBus/InternalQueryBus';
import { instance, mock, when } from 'ts-mockito';
import { QueryMiddleware } from '../../src/queryBus/middlewares/QueryMiddleware';

t.mochaGlobals();

describe('Internal Query Bus', () => {
  describe('.publish()', () => {
    it('triggers middlewares chain', async () => {
      // GIVEN
      class TestQuery extends Query<boolean> {
        label = () => TestQuery.name;
      }

      const query = new TestQuery();
      const middlewareChain = mock<QueryMiddleware>();
      when(middlewareChain.handle(query)).thenResolve(true);

      // WHEN
      const actual = await new InternalQueryBus(instance(middlewareChain)).publish(query);

      // THEN
      t.equal(actual, true);
    });
  });
});
