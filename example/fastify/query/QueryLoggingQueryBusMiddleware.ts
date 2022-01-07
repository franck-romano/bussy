import { QueryMiddleware } from '../types/QueryMiddleware';
import { BusLogger } from '../../common/BusLogger';
import { Query } from '../types/Query';
import { ReadModel } from '../types/ReadModel';

export class LoggingQueryBusMiddleware implements QueryMiddleware {
  constructor(private nextMiddleware: QueryMiddleware, private logger: BusLogger) {}

  async handle(query: Query): Promise<ReadModel> {
    this.logger.info(`Executing query ${query.label()}`, { query });
    try {
      const result = await this.nextMiddleware.handle(query);
      this.logger.info(`Success on query ${query.label()}`, { query });

      return result;
    } catch (error) {
      this.logger.error(`Error on query ${query.label()}`, { error });
      throw error;
    }
  }
}
