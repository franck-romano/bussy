import { CommandHandler } from '../../../../src/commandBus/types/CommandHandler';
import { CreateCommentCommand } from './CreateCommentCommand';
import { CommandResponse } from '../../../../src/commandBus/types/CommandResponse';
import { CommentRepository } from '../domain/CommentRepository';
import { Comment } from '../domain/Comment';

export class CreateCommentCommandHandler implements CommandHandler<string, CreateCommentCommand> {
  constructor(private repository: CommentRepository) {}

  async handle(command: CreateCommentCommand): Promise<CommandResponse<string>> {
    const comment = Comment.create(command.content);
    this.repository.add(comment);

    return CommandResponse.with(comment.id, comment.raisedEvents);
  }

  name = () => CreateCommentCommandHandler.name;
}
