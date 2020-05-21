import { GuildChannel } from "../models/channels/GuildChannel.ts";
import { TextChannel } from "../models/channels/TextChannel.ts";
import Guild from "../models/Guild.ts";
import Message from "../models/Message.ts";

export interface Client {
  channelCreate: (channel: GuildChannel) => void;
  channelUpdate: (oldChannel: GuildChannel, newChannel: GuildChannel) => void;
  channelDelete: (channel: GuildChannel) => void;
  channelPinsUpdate: (channel: TextChannel, time: Date) => void;
  guildCreate: (guild: Guild) => void;
  guildUpdate: (oldGuild: Guild, newGuild: Guild) => void;
  guildDelete: (guild: Guild) => void;
  ready: () => void;
  resumed: () => void;
  message: (message: Message) => void;
}
