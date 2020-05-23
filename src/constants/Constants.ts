export enum Constants {
  GATEWAY = "wss://gateway.discord.gg/?v=6&encoding=json",
  API = "https://discord.com/api/v6",
}

export enum OPCODE {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  ELEVEN = 11,
  TWELVE = 12,
}

export enum ENDPOINTS {
  USERS = 'users',
  USER_GUILDS = 'users/@me/guilds',
  GUILDS = 'guilds',
  CHANNELS = 'channels',
  MESSAGES = 'messages',
  MEMBERS = 'members',
  REACTIONS = 'reactions',
  PINS = 'pins',
}

export enum StatusCode {
  OK = 200,
  NO_CONTENT = 204,
  CREATED = 201,
  BAD = 400,
  NOT_FOUND = 404,
}

export enum REGEX {
  EMOJI_WITH_COLON = ':\\w+:\\d+',
  GROUP_EMOJI_ID = '^:\\w+:(\\d+)$',
  EMOJI_ID_ONLY = '^\\d+$',
  GROUP_EMOJI_NAME = '^:(\\w+):\d+$',
  GROUP_EMOJI = '^:(\\w+):(\\d+)$'
}