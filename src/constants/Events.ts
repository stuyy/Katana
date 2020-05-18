export enum Events {
  READY = 'ready',
  RESUMED = 'resumed',
  RECONNECT = 'reconnect',
  INVALID_SESSION = 'invalid',
  CHANNEL_CREATE = 'channelCreate',
  CHANNEL_UPDATE = 'channelUpdate',
  CHANNEL_DELETE = 'channelDelete',
  CHANNEL_PINS_UPDATE = 'channelPinsUpdate',
  GUILD_CREATE = 'guildCreate',
  GUILD_UPDATE = 'guildUpdate',
  GUILD_DELETE = 'guildDelete',
  GUILD_BAN_ADD = 'guildBanAdd',
  GUILD_BAN_REMOVE = 'guildBanRemove',
  GUILD_EMOJIS_UPDATE = 'guildEmojisUpdate',
  GUILD_INTEGRATIONS_UPDATE = 'guildIntegrationsUpdate',
  GUILD_MEMBER_ADD = 'guildMemberAdd',
  GUILD_MEMBER_REMOVE = 'guildMemberRemove',
  GUILD_MEMBER_UPDATE = 'guildMemberUpdate',
  GUILD_MEMBERS_CHUNK = 'guildMemberAdd',
  GUILD_ROLE_CREATE = 'guildRoleCreate',
  GUILD_ROLE_UPDATE = 'guildRoleUpdate',
  GUILD_ROLE_DELETE = 'guildRoleDelete',
  INVITE_CREATE = 'inviteCreate',
  INVITE_DELETE = 'inviteDelete',
  MESSAGE_CREATE = 'messageCreate',
  MESSAGE_UPDATE = 'messageUpdate',
  MESSAGE_DELETE = 'messageDelete',
  MESSAGE_DELETE_BULK = 'messageDeleteBulk',
  MESSAGE_REACTION_ADD = 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE = 'messageReactionRemove',
  MESSAGE_REACTION_REMOVE_ALL = 'messageReactionRemoveAll',
  MESSAGE_REACTION_REMOVE_EMOJI = 'messageReactionRemoveEmoji',
  PRESENCE_UPDATE = 'presenceUpdate',
  TYPING_START = 'typingStart',
  USER_UPDATE = 'userUpdate',
  VOICE_STATE_UPDATE = 'voiceStateUpdate',
  VOICE_SERVER_UPDATE = 'voiceStateUpdate',
  WEBHOOKS_UPDATE = 'webhooksUpdate',
}