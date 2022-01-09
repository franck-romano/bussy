import { ReadModel } from '../types/ReadModel';
import { BusLogger } from '../../common/BusLogger';
import { Query } from '../types/Query';
import { QueryMiddleware } from './QueryMiddleware';

export class LoggingQueryBusMiddleware implements QueryMiddleware {
  constructor(private logger: BusLogger, private next: QueryMiddleware) {}

  async handle(query: Query): Promise<ReadModel> {
    this.logger.info(`Executing query ${query.label()}`, { query });
    try {
      const result = await this.next.handle(query);
      this.logger.info(`Success on query ${query.label()}`, { query });

      return result;
    } catch (error) {
      this.logger.error(`Error on query ${query.label()}`, { error });
      throw error;
    }
  }
}
