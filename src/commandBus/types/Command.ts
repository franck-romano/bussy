import { Message } from '../../common/Message';

export abstract class Command<RESULT> implements Message {
  protected result!: RESULT;

  abstract label(): string;
}
