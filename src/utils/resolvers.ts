import { GuildChannel } from "../models/channels/GuildChannel.ts";
import Guild from "../models/Guild.ts";
import Client from "../client/Client.ts";
import Emoji from "../models/Emoji.ts";
import Role from "../models/Role.ts";
import { ChannelType, ChannelTypeDef } from "../typedefs/ChannelType.ts";
import Collection from "../models/Collection.ts";
import User from "../models/User.ts";
import GuildMember from "../models/GuildMember.ts";
import { TextChannel } from "../models/channels/TextChannel.ts";
import { CategoryChannel } from "../models/channels/CategoryChannel.ts";
import { VoiceChannel } from "../models/channels/VoiceChannel.ts";
import { BaseChannel } from "../models/channels/BaseChannel.ts";
import Message from '../models/Message.ts';

export function resolveChannels(
  client: Client,
  guild: Guild,
  channels: Array<any>,
) {
  const channelsMap = new Collection<string, GuildChannel>();
  for (const c of channels) {
    let channel;
    switch (c.type) {
      case ChannelType.TEXT:
        channel = buildTextChannel(client, guild, c);
        break;
      case ChannelType.CATEGORY:
        channel = buildCategoryChannel(client, guild, c);
        break;
      case ChannelType.VOICE:
        channel = buildVoiceChannel(client, guild, c);
        break;
      default:
        channel = new BaseChannel(
          client,
          c.id,
          c?.name,
          ChannelTypeDef.UNKNOWN,
        );
        break;
    }
    client.channels.set(channel.id, channel);
  }
  return channelsMap;
}

export function resolveEmojis(client: Client, emojis: Array<any>) {
  const emojiMap = new Collection<string, Emoji>();
  for (const emoji of emojis) {
    const emojiRoles = emoji.roles;
    const roles = new Collection();
    for (const role of emojiRoles) roles.set(role.id, buildRoleInstance(role));
    const emojiInstance = buildEmojiInstance(emoji, roles);
    emojiMap.set(emojiInstance.id, emojiInstance);
    client.emojis.set(emojiInstance.id, emojiInstance);
  }
  return emojiMap;
}

export function buildEmojiInstance(emoji: any, roles: Collection<string, Role>): Emoji {
  return new Emoji(emoji.id, emoji.name, roles, emoji.users, emoji.required_colons, emoji.managed, emoji.animated, emoji.available)
}

export function buildRoleInstance(role: any): Role {
  return new Role(role.id, role.name,role.color,role.hoist,role.position,role.permissions,role.managed,role.mentionable)
}

export function resolveRoles(client: Client, roles: Array<any>) {
  const rolesMap = new Collection<string, Role>();
  for (const role of roles) {
    rolesMap.set(
      role.id,
      new Role(
        role.id,
        role.name,
        role.color,
        role.hoist,
        role.position,
        role.permissions,
        role.managed,
        role.mentionable,
      ),
    );
  }
  return rolesMap;
}

export function resolveGuildMembersAndUsers(
  client: Client,
  newGuild: Guild,
  members: Array<any>,
) {
  const membersMap = new Collection();
  for (const member of members) {
    const { user } = member;
    client.users.set(
      user.id,
      new User(
        user.id,
        user.username,
        user.discriminator,
        user.avatar,
        user.bot,
        user.system,
        user.mfaEnabled,
        user.locale,
        user.verified,
        user.flags,
        user.premiumType,
        user.public_flags,
        client,
      ),
    );
    const roles = new Collection<string, Role>();
    for (const role of member.roles) {
      roles.set(role, newGuild.roles.get(role));
    }
    membersMap.set(
      user.id,
      new GuildMember(
        user,
        member.nick,
        roles,
        member.joined_at,
        member.premium_since,
        member.deaf,
        member.mute,
      ),
    );
  }
  return membersMap;
}
export function buildGuildInstance(
  roles: Collection<string, Role>,
  emojis: Collection<string, Emoji>,
  guild: any,
) {
  return new Guild(
    guild.id,
    guild.name,
    guild.icon,
    guild.description,
    guild.splash,
    guild.discovery_splash,
    guild.features,
    emojis,
    guild.banner,
    guild.owner_id,
    guild.application_id,
    guild.region,
    guild.afk_channel_id,
    guild.afk_timeout,
    guild.system_channel_id,
    guild.widget_enabled,
    guild.widget_channel_id,
    guild.verification_level,
    roles,
    guild.default_message_notifications,
    guild.mfa_level,
    guild.explicit_content_filter,
    guild.max_presences,
    guild.max_members,
    guild.max_video_channel_users,
    guild.vanity_url_code,
    guild.premium_tier,
    guild.premium_subscription_count,
    guild.system_channel_flags,
    guild.preferred_locale,
    guild.rules_channel_id,
    guild.public_updates_channel_id,
    guild.embed_enabled,
    guild.embed_channel_id,
  );
}

export function buildVoiceChannel(
  client: Client,
  guild: Guild,
  c: any,
): VoiceChannel {
  return new VoiceChannel(
    c.id,
    client,
    ChannelTypeDef.VOICE,
    c.last_message_id,
    c.last_pin_timestmap,
    c.name,
    c.position,
    c.parent_id,
    c.topic,
    guild,
    c.permission_overwrites,
    c.nsfw,
    c.rate_limit_per_user,
  );
}

export function buildCategoryChannel(client: Client, guild: Guild, c: any) {
  return new CategoryChannel(
    c.id,
    client,
    ChannelTypeDef.CATEGORY,
    c.last_message_id,
    c.last_pin_timestmap,
    c.name,
    c.position,
    c.parent_id,
    c.topic,
    guild,
    c.permission_overwrites,
    c.nsfw,
    c.rate_limit_per_user,
  );
}
export function buildTextChannel(client: Client, guild: Guild, c: any) {
  return new TextChannel(
    c.id,
    client,
    ChannelTypeDef.TEXT,
    c.last_message_id,
    c.last_pin_timestmap,
    c.name,
    c.position,
    c.parent_id,
    c.topic,
    guild,
    c.permission_overwrites,
    c.nsfw,
    c.rate_limit_per_user,
  );
}

export function buildGroupDMChannel(client: Client, guild: Guild, c: any) {
}

export async function buildMessage(client: Client, message_payload: any) {

  const {
    channel_id,
    guild_id,
    author,
  } = message_payload;

  let channel = client.channels.get(channel_id);
  let guild: Guild = client.guilds.get(guild_id);
  let user: User = client.users.get(author.id);
  if (!channel) {
    const now = performance.now();
    channel = await client.rest.fetchChannel(channel_id);
    const end = performance.now();
    console.log(`Took ${Math.round(end - now)}ms to fetch channel.`);
  }

  if (!guild) {
    const now = performance.now();
    guild = await client.rest.fetchGuild(guild_id);
    const end = performance.now();
    console.log(`Took ${Math.round(end - now)}ms to fetch guild.`);
  }

  if (!user) {
    const now = performance.now();
    user = await client.rest.fetchUser(author.id);
    const end = performance.now();
    console.log(`Took ${Math.round(end - now)}ms to fetch guild.`);
  }
  const member = guild.members.get(author.id);
  const {
    id,
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
  return new Message(
    id,
    channel,
    guild,
    user,
    member,
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
  );
}

export function getChannelType(type: number): ChannelType {
  if (type === 0) return ChannelType.TEXT;
  if (type === 1) return ChannelType.DM;
  if (type === 2) return ChannelType.VOICE;
  if (type === 3) return ChannelType.DM;
  if (type === 4) return ChannelType.CATEGORY;
  if (type === 5) return ChannelType.NEWS;
  if (type === 6) return ChannelType.STORE;
  return ChannelType.UNKNOWN;
}
