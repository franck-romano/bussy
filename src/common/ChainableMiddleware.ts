import { Middleware } from './Middleware';

export type ChainableMiddleware<SELF extends Middleware<any, any>> = {
  chainWith<NEXT extends Middleware<any, any>>(next: NEXT): SELF;
};
