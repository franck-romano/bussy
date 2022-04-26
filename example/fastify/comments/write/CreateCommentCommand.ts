import { Command } from '../../../../src/commandBus/types/Command';

export class CreateCommentCommand implements Command<string> {
  constructor(public content: string) {}

  label = (): string => CreateCommentCommand.name;
}
