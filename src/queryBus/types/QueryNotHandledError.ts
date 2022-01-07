export class QueryNotHandledError extends Error {
  constructor(queryName: string) {
    super(`Query ${queryName} not handled`);
  }
}
