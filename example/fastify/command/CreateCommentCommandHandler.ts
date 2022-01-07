import { CommandHandler } from '../../../src/commandBus/types/CommandHandler';
import { CreateCommentCommand } from './CreateCommentCommand';
import { CommandResponse } from '../../../src/commandBus/types/CommandResponse';
import { CommentCreatedEvent } from './CommentCreatedEvent';

export class CreateCommentCommandHandler implements CommandHandler<CreateCommentCommand> {
  async handle(command: CreateCommentCommand): Promise<CommandResponse> {
    return {
      events: [new CommentCreatedEvent(command.content)],
      result: 'some-id'
    };
  }

  name = () => CreateCommentCommandHandler.name;
}
