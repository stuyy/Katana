import { BaseCollector } from './BaseCollector.ts';
import { TextChannel } from '../channels/TextChannel.ts';
import { MessageCollectorOptions } from '../../typedefs/CollectorOptions.ts';
import { Message } from '../Message.ts';

export class MessageCollector extends BaseCollector {
  constructor(channel: TextChannel, filter: Function, options?: MessageCollectorOptions) {
    super(channel.client, filter, options);
    this.client.on('message', this.handleCollect.bind(this));
    setTimeout(() => {
      this.emit('end', this.collected);
      this.client.off('message', this.handleCollect);
      console.log('Removed Listener....');
    }, options?.time) 
  }

  handleCollect(message: Message) {
    if (this.filter(message)) {
      this.emit('collect', message);
      this.collected.set(message.id, message);
    }
  }
}