import { BusLogger } from '../../common/BusLogger';
import { Query } from '../types/Query';
import { ChainableQueryMiddleware, QueryMiddleware } from './QueryMiddleware';

export class LoggingQueryBusMiddleware implements QueryMiddleware {
  private constructor(private logger: BusLogger, private next: QueryMiddleware) {}

  static build(logger: BusLogger): ChainableQueryMiddleware<LoggingQueryBusMiddleware> {
    return {
      chainWith(next: QueryMiddleware) {
        return new LoggingQueryBusMiddleware(logger, next);
      }
    };
  }

  async handle<RESULT>(query: Query<RESULT>): Promise<RESULT> {
    const queryName = query.label();

    this.logger.info(`Executing query ${queryName}`, { query });
    try {
      const result = await this.next.handle(query);
      this.logger.info(`Success on query ${queryName}`, { query });

      return result as RESULT;
    } catch (error) {
      this.logger.error(`Error on query ${queryName}`, { error });
      throw error;
    }
  }
}
