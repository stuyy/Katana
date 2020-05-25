import Client from '../client/Client.ts';
import { Payload } from '../constants/Payloads.ts';
import { MessageReaction } from '../models/MessageReaction.ts';
import { buildUser, buildTextChannel, buildGuildInstance } from '../utils/resolvers.ts';
import { TextChannel } from '../models/channels/TextChannel.ts';
import Emoji from '../models/Emoji.ts';
import Collection from '../models/Collection.ts';
import User from '../models/User.ts';

export default async function(client: Client, payload: Payload) {
  const { user_id, message_id, channel_id, emoji } = payload.d;
  let user = client.users.get(user_id);
  if (!user) {
    const response = await client.rest.fetchUser(user_id);
    user = buildUser(client, response);
  }
  const channel = client.channels.get(channel_id);
  const message = channel?.messages.get(message_id);
  if (message) {
    // If emoji.id is null, it is a unicode emoji.
    const emojiObj = new Emoji(emoji.id, emoji.name, null, null, null, null, null, null);
    const users: Collection<string, User> = new Collection();
    users.set(user.id, user);
    const reaction = new MessageReaction(client, emojiObj, message, client.user.id === user_id, users);
    client.emit('messageReactionAdd', reaction, user);
  }
}