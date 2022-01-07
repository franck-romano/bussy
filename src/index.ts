import { InternalEventBus } from './eventBus/InternalEventBus';
import { InternalCommandBus } from './commandBus/InternalCommandBus';
import { InternalQueryBus } from './queryBus/InternalQueryBus';

export const EventBus = new InternalEventBus();
export const QueryBus = new InternalCommandBus();
export const CommandBus = new InternalQueryBus();
