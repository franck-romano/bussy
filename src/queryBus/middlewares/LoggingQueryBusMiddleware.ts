import { ReadModel } from '../types/ReadModel';
import { QueryMiddleware, QueryMiddlewareHandler } from '../types/QueryMiddleware';
import { BusLogger } from '../../common/BusLogger';
import { Query } from '../types/Query';

export class LoggingQueryBusMiddleware implements QueryMiddleware {
  constructor(private logger: BusLogger) {}

  chainWith(nextMiddleware: QueryMiddlewareHandler): QueryMiddlewareHandler {
    return {
      handle: async (query: Query): Promise<ReadModel> => {
        this.logger.info(`Executing query ${query.label()}`, { query });
        try {
          const result = await nextMiddleware.handle(query);
          this.logger.info(`Success on query ${query.label()}`, { query });

          return result;
        } catch (error) {
          this.logger.error(`Error on query ${query.label()}`, { error });
          throw error;
        }
      }
    };
  }
}
