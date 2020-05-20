import GuildChannel from '../models/channels/GuildChannel.ts';
import Guild from "../models/Guild.ts";
import { Client } from "../client/Client.ts";
import Emoji from "../models/Emoji.ts";
import Role from "../models/Role.ts";
import { ChannelType } from '../constants/Constants.ts';

export function resolveChannels(client: Client, guild: Guild, channels: Array<any>) {
  const channelsMap = new Map<string, GuildChannel>();
  for (const c of channels) {
    channelsMap.set(c.id, new GuildChannel(
      c.id,
      client,
      getChannelType(c.type),
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
    ));
  }
  return channelsMap;
}

export function resolveEmojis(client: Client, emojis: Array<any>) {
  const emojiMap = new Map<string, Emoji>();
  for (const emoji of emojis) {
    const emojiRoles = emoji.roles;
    const roles = new Map();
    for (const role of emojiRoles) {
      roles.set(role.id, new Role(
        role.id,
        role.name,
        role.color,
        role.hoist,
        role.position,
        role.permissions,
        role.managed,
        role.mentionable 
      ));
    }
    emojiMap.set(emoji.id, new Emoji(
      emoji.id,
      emoji.name,
      roles,
      emoji.users,
      emoji.required_colons,
      emoji.managed,
      emoji.animated,
      emoji.available
    ));
  }
  return emojiMap;
}

export function resolveRoles(client: Client, roles: Array<any>) {
  const rolesMap = new Map<string, Role>();
  for (const role of roles) {
    rolesMap.set(role.id, new Role(
      role.id,
      role.name,
      role.color,
      role.hoist,
      role.position,
      role.permissions,
      role.managed,
      role.mentionable 
    ));
  }
  return rolesMap;
}

export function buildGuildInstance(roles: Map<string, Role>, emojis: Map<string, Emoji>, guild: any) {
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

export function getChannelType(type: number): ChannelType {
  if (type === 0) return ChannelType.TEXT;
  if (type === 1) return ChannelType.DM;
  if (type === 2) return ChannelType.VOICE;
  if (type === 3) return ChannelType.GROUP_DM;
  if (type === 4) return ChannelType.CATEGORY;
  if (type === 5) return ChannelType.NEWS;
  if (type === 6) return ChannelType.STORE;
  return ChannelType.UNKNOWN;
}