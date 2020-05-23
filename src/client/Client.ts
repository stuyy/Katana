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
}

export declare interface Client {
  on<Event extends keyof ClientEvents>(
    event: Event,
    listener: ClientEvents[Event],
  ): this;
  emit<Event extends keyof ClientEvents>(
    event: Event,
    ...args: Parameters<ClientEvents[Event]>
  ): boolean;
}

export class Client extends EventEmitter {
  private _user!: ClientUser;
  private _guilds: Collection<string, Guild> = new Collection();
  private _channels: Collection<string, BaseChannel> = new Collection();
  private _users: Collection<string, User> = new Collection();
  private _emojis: Collection<string, Emoji> = new Collection();

  private socket: WebSocketManager = new WebSocketManager(this);
  private _rest: RestAPIHandler = new RestAPIHandler(this);

  async login(token: string): Promise<void> {
    try {
      this._rest.token = token;
      await this.socket.connect(token);
    } catch (err) {
      console.log(err);
    }
  }

  get user() { return this._user; }
  set user(user: ClientUser) { this._user = user; }
  get guilds() { return this._guilds; }
  get rest(): RestAPIHandler { return this._rest; }
  get channels(): Collection<string, BaseChannel> { return this._channels; }
  get users(): Collection<string, User> { return this._users; }
  get emojis(): Collection<string, Emoji> { return this._emojis; }
}

export default Client;
