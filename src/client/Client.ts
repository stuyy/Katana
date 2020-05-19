import EventEmitter from 'https://deno.land/std@0.51.0/node/events.ts';
import WebSocketManager from '../client/ws/Websocket.ts';
import ClientUser from './ClientUser.ts';
import Guild from '../models/Guild.ts';
import RestAPIHandler from '../client/rest/RestAPIHandler.ts';
import GuildChannel from '../models/GuildChannel.ts';

export class Client extends EventEmitter {

  private _user!: ClientUser;
  private _guilds: Map<string, Guild> = new Map();
  private _channels: Map<string, GuildChannel> = new Map();

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

  get user() {
    return this._user;
  }

  set user(user: ClientUser) {
    this._user = user;
  }

  get guilds() {
    return this._guilds;
  }

  get rest(): RestAPIHandler {
    return this._rest;
  }
  
}