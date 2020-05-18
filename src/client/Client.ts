import EventEmitter from 'https://deno.land/std@0.51.0/node/events.ts';
import WebSocketManager from '../ws/Websocket.ts';
import ClientUser from './ClientUser.ts';
import Guild from '../models/Guild.ts';

export class Client extends EventEmitter {

  private _user!: ClientUser;
  private _token!: string;
  private _guilds: Map<string, Guild> = new Map();

  private socket: WebSocketManager = new WebSocketManager(this);
  async login(token: string): Promise<void> {
    try {
      this._token = token;
      await this.socket.connect(token);
      console.log(this.token);
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

  get token() {
    return this._token;
  }

  get guilds() {
    return this._guilds;
  }
  
}