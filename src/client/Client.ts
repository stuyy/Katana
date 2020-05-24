import EventEmitter from "https://deno.land/std@0.51.0/node/events.ts";
import WebSocketManager from "../client/ws/WebSocket.ts";
import ClientUser from "./ClientUser.ts";
import Guild from "../models/Guild.ts";
import RestAPIHandler from "../client/rest/RestAPIHandler.ts";
import Collection from "../models/Collection.ts";
import { BaseChannel } from "../models/channels/BaseChannel.ts";
import { GuildChannel } from "../models/channels/GuildChannel.ts";
import { TextChannel } from "../models/channels/TextChannel.ts";
import { Message } from "../models/Message.ts";
import User from "../models/User.ts";
import Emoji from '../models/Emoji.ts';
import { MessageReaction } from '../models/MessageReaction.ts';

interface ClientEvents {
  channelCreate: (channel: GuildChannel) => void;
  channelUpdate: (oldChannel: GuildChannel, newChannel: GuildChannel) => void;
  channelDelete: (channel: GuildChannel) => void;
  channelPinsUpdate: (channel: TextChannel, time: Date) => void;
  debug: (...args: any) => void;
  guildCreate: (guild: Guild) => void;
  guildUpdate: (oldGuild: Guild, newGuild: Guild) => void;
  guildDelete: (guild: Guild) => void;
  ready: () => void;
  resumed: () => void;
  message: (message: Message) => void;
  messageReactionAdd: (reaction: MessageReaction, user: User) => void;
}

export declare interface Client {
  user: ClientUser;
  guilds: Collection<string, Guild>;
  channels: Collection<string, BaseChannel>;
  users: Collection<string, User>;
  emojis: Collection<string, Emoji>;
  socket: WebSocketManager;
  rest: RestAPIHandler;

  on<Event extends keyof ClientEvents>(
    event: Event,
    listener: ClientEvents[Event],
  ): this;
  off<Event extends keyof ClientEvents>(
    event: Event,
    listener: ClientEvents[Event]
  ): this;
  emit<Event extends keyof ClientEvents>(
    event: Event,
    ...args: Parameters<ClientEvents[Event]>
  ): boolean;

  login(token: string): Promise<void>;
}

export class Client extends EventEmitter {
  constructor() {
    super();
    this.guilds = new Collection();
    this.channels = new Collection();
    this.users = new Collection();
    this.emojis = new Collection();
    this.socket = new WebSocketManager(this);
    this.rest = new RestAPIHandler(this);
  }

  async login(token: string): Promise<void> {
    try {
      this.rest.token = token;
      await this.socket.connect(token);
    } catch (err) {
      console.log(err);
    }
  }
}

export default Client;
