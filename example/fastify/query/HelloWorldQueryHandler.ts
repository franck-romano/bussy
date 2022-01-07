import { QueryHandler } from '../../../src/queryBus/types/QueryHandler';
import { HelloWorldQuery } from './HelloWorldQuery';
import { ReadModel } from '../../../src/queryBus/types/ReadModel';

export class HelloWorldQueryHandler implements QueryHandler<HelloWorldQuery> {
  async handle(query: HelloWorldQuery): Promise<ReadModel> {
    return {
      hello: 'world'
    };
  }

  name = (): string => HelloWorldQueryHandler.name;
}
