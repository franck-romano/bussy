export class EventNotHandledError extends Error {
  constructor(eventName: string) {
    super(`Domain Event ${eventName} not handled`);
  }
}
