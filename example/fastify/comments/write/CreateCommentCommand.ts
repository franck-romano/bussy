import { Command } from '../../../../src/commandBus/types/Command';

export class CreateCommentCommand implements Command {
  constructor(public content: string) {}

  label = (): string => CreateCommentCommand.name;
}
