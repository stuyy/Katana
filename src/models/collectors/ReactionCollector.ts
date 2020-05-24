import { Message } from '../Message.ts';
import { ReactionCollectorOptions } from '../../typedefs/CollectorOptions.ts';
import { BaseCollector } from './BaseCollector.ts';

export class ReactionCollector extends BaseCollector {
  constructor(message: Message, filter: Function, options?: ReactionCollectorOptions) {
    super(message.client, filter, options);
  }
}