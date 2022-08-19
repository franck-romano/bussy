import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';
import { Middleware } from '../../common/Middleware';
import { ChainableMiddleware } from '../../common/ChainableMiddleware';

export interface CommandMiddleware<RESULT> extends Middleware<Command<RESULT>, CommandResponse<RESULT>> {}

export type ChainableCommandMiddleware<RESULT, SELF extends CommandMiddleware<RESULT>> = ChainableMiddleware<SELF>;
