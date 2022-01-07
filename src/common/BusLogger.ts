import pino from 'pino';

export interface BusLogger {
  error<T extends object>(message: string, obj: T): void;

  info<T extends object>(message: string, obj: T, ...args: any[]): void;
}

export class PinoLogger implements BusLogger {
  private readonly pino = pino();

  error<T extends object>(message: string, obj: T): void {
    this.pino.error(obj, message);
  }

  info<T extends object>(message: string, obj?: T, ...args: any[]): void {
    this.pino.info(obj, message, args);
  }
}
