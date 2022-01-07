export class CommandNotHandledError extends Error {
  constructor(commandName: string) {
    super(`Command ${commandName} not handled`);
  }
}
