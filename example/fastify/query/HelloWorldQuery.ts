import { Query } from '../../../src/queryBus/types/Query';

export class HelloWorldQuery implements Query {
  constructor(public content: string) {}

  label = (): string => HelloWorldQuery.name;
}
