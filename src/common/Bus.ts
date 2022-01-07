import { Message } from './Message';

export interface Bus<INPUT extends Message, RESULT> {
  publish(message: INPUT | INPUT[] | Readonly<INPUT[]>): Promise<Readonly<RESULT>> | Readonly<RESULT>;
}
