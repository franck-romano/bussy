import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';
import { Middleware } from '../../common/Middleware';
import { ChainableMiddleware } from '../../common/ChainableMiddleware';

export interface CommandMiddleware extends Middleware<Command, CommandResponse> {}

export type ChainableCommandMiddleware<SELF extends CommandMiddleware> = ChainableMiddleware<SELF>;
