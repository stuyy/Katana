import Client from '../client/Client.ts';
import { Payload } from '../constants/Payloads.ts';
import { buildMessage } from '../utils/resolvers.ts';
import { TextChannel } from '../models/channels/TextChannel.ts';

export default async (client: Client, payload: Payload) => {

  // Need to serialize the payload object into an actual message.
  const msg = payload.d;
  console.log('Message Update');
  console.log(msg);
  // const message = await buildMessage(client, msg);
  // const channel = <TextChannel>client.channels.get(message.channel.id);
  // channel.messages.set(message.id, message);
}