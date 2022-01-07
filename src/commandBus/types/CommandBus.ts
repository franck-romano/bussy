import { Bus } from '../../common/Bus';
import { Command } from './Command';
import { CommandHandler } from './CommandHandler';
import { CommandResponse } from './CommandResponse';

export type CommandHandlers = { [commandLabel: string]: CommandHandler<Command> };

export interface CommandBus extends Bus<Command, CommandResponse> {}
