import { Message } from './Message';

export interface Middleware<INPUT extends Message, RESULT> {
  handle(input: INPUT): Promise<RESULT>;
}
