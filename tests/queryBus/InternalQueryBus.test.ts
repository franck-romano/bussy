import t from 'tap';
import { Query } from '../../src/queryBus/types/Query';
import { InternalQueryBus } from '../../src/queryBus/InternalQueryBus';
import { instance, mock, when } from 'ts-mockito';
import { QueryMiddleware } from '../../src/queryBus/types/QueryMiddleware';
import { ReadModel } from '../../src/queryBus/types/ReadModel';

t.mochaGlobals();

describe('Internal Query Bus', () => {
  describe('.publish()', () => {
    it('triggers middlewares chain', async () => {
      // GIVEN
      class TestQuery implements Query {
        label = () => TestQuery.name;
      }

      const query = new TestQuery();
      const middlewareChain = mock<QueryMiddleware>();
      const readModel: ReadModel = {};
      when(middlewareChain.handle(query)).thenResolve(readModel);

      // WHEN
      const actual = await new InternalQueryBus(instance(middlewareChain)).publish(query);

      // THEN
      t.equal(actual, readModel);
    });
  });
});
