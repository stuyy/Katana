import Message from '../Message.ts';
import { MessageOptions } from '../../typedefs/MessageOptions.ts';

export default interface TextBasedChannel {

  send(payload: string | MessageOptions): any;
}