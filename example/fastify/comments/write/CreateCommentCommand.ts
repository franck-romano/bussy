import { Command } from '../../../../src/commandBus/types/Command';

export class CreateCommentCommand extends Command<string> {
  constructor(public content: string) {
    super();
  }

  label = (): string => CreateCommentCommand.name;
}
