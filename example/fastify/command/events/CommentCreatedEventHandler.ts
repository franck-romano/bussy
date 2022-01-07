import { EventHandler } from '../../../src/eventBus/types/EventHandler';
import { CommentCreatedEvent } from './CommentCreatedEvent';

export class CommentCreatedEventHandler implements EventHandler<CommentCreatedEvent> {
  async reactTo(event: CommentCreatedEvent): Promise<void> {}

  name = () => CommentCreatedEventHandler.name;
}
