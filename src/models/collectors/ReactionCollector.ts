import { Message } from '../Message.ts';
import { ReactionCollectorOptions } from '../../typedefs/CollectorOptions.ts';
import { BaseCollector } from './BaseCollector.ts';
import { MessageReaction } from '../MessageReaction.ts';
import User from '../User.ts';

export class ReactionCollector extends BaseCollector {
  constructor(message: Message, filter: Function, options?: ReactionCollectorOptions) {
    super(message.client, filter, options);
    this.client.on('messageReactionAdd', this.handleCollect);
    setTimeout(() => {
      this.emit('end', this.collected);
      this.client.off('messageReactionAdd', this.handleCollect);
      console.log('Removed Listener....');
    }, options?.time);
  }

  handleCollect = (reaction: MessageReaction, user: User) => {
    if (this.filter(reaction, user)) {
      this.emit('collect', reaction, user);
      // For every emoji ID or name, take the reaction and set the users property.
      // Check if collected has the emoji, if it does, get the reaction users map and add user
      // If collected has no emoji, then set it.
      const collected: MessageReaction = this.collected.get(reaction.emoji.id || reaction.emoji.name);
      if (collected) collected.users.set(user.id, user);
      else this.collected.set(reaction.emoji.id || reaction.emoji.name, reaction);
    }
  }
}