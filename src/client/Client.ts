import EventEmitter from 'https://deno.land/std@0.51.0/node/events.ts';
import WebSocketManager from '../ws/Websocket.ts';

export default class Client extends EventEmitter {

  private socket: WebSocketManager = new WebSocketManager(this);
  async login(token: string): Promise<void> {
    try {
      await this.socket.connect(token);
    } catch (err) {
      console.log(err);
    }
  }
}