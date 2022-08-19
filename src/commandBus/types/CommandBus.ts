import { Bus } from '../../common/Bus';
import { Command } from './Command';
import { CommandHandler } from './CommandHandler';
import { CommandResponse } from './CommandResponse';

export type CommandHandlers<T = any> = { [commandLabel: string]: CommandHandler<T, Command<T>> };

export interface CommandBus extends Bus<Command<unknown>, CommandResponse<unknown>> {}
