import { CommandResponse } from '../types/CommandResponse';
import { Command } from '../types/Command';
import { Middleware } from '../../common/Middleware';
import { ChainableMiddleware } from '../../common/ChainableMiddleware';

export interface CommandMiddleware<T> extends Middleware<Command<T>, CommandResponse<T>> {}

export type ChainableCommandMiddleware<T, SELF extends CommandMiddleware<T>> = ChainableMiddleware<SELF>;
