import Client from "../client/Client.ts";
import { Payload } from '../constants/Payloads.ts';
import { Events } from '../constants/Events.ts';
import { MessageType } from '../typedefs/MessageType.ts';
import Message from '../models/Message.ts';
import { BaseChannel } from '../models/channels/BaseChannel.ts';
import Guild from '../models/Guild.ts';
import User from '../models/User.ts';
import { TextChannel } from '../models/channels/TextChannel.ts';

export default async function(client: Client, payload: Payload) {
  
  const { d: message_payload } = payload;
  const {
    channel_id,
    guild_id,
    id,
    author,
    content,
    timestamp,
    edited_timestamp,
    tts,
    mention_everyone,
    attachments,
    embeds,
    reactions,
    nonce,
    pinned,
    type,
  } = message_payload;

  let channel = client.channels.get(channel_id);
  let guild: Guild = client.guilds.get(guild_id);
  let user: User = client.users.get(author.id);
  if (!channel) {
    const now = performance.now();
    channel = await client.rest.fetchChannel(channel_id);
    const end = performance.now();
    console.log(`Took ${Math.round(end-now)}ms to fetch channel.`);
  }

  if (!guild) {
    const now = performance.now();
    guild = await client.rest.fetchGuild(guild_id);
    const end = performance.now();
    console.log(`Took ${Math.round(end-now)}ms to fetch guild.`);
  }

  if (!user) {
    const now = performance.now();
    user = await client.rest.fetchUser(author.id);
    const end = performance.now();
    console.log(`Took ${Math.round(end-now)}ms to fetch guild.`);
  }

  const member = guild.members.get(author.id);
  const message = new Message(
    id, channel, guild, user, member, content, timestamp, edited_timestamp, tts, mention_everyone, attachments, embeds, reactions, nonce, pinned, type
  );

  client.emit(Events.MESSAGE_CREATE, message);
}