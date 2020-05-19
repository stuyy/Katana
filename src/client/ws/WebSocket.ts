
import { connectWebSocket, WebSocket } from "https://deno.land/std/ws/mod.ts";
import EventEmitter from 'https://deno.land/std@0.51.0/node/events.ts';
import { Constants, OPCODE } from '../../constants/Constants.ts';
import { Identify, Heartbeat } from '../../constants/Payloads.ts';
import { Payload } from '../../interfaces/Payload.ts';
import { Client } from "../Client.ts";

export default class WebSocketManager extends EventEmitter {

  private interval: number = 0;
  private socket!: WebSocket;
  private ackReceived: boolean = false;

  constructor(private client: Client) {
    super();
  }

  async connect(token: string) {
    try {
      this.socket = await connectWebSocket(Constants.GATEWAY);
      for await (const msg of this.socket) {
        console.log(msg);
        const payload: Payload = JSON.parse(msg.toString());
        const { t: event, op } = payload;
        switch (op) {
          case OPCODE.TEN:
            const { heartbeat_interval } = payload.d;
            this.interval = await this.heartbeat(heartbeat_interval);
            await this.identify(token);
            break;
          case OPCODE.ELEVEN:
            this.ackReceived = true;
            break;
          case OPCODE.NINE:
            console.log('Invalid gateway session');
            break;
        }
        if (event) {
          try {
            const { default: module } = await import(`../../handlers/${event}.ts`);
            module(this.client, payload);
          } catch (err) {
            // console.log(err);
          }
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  private heartbeat(ms: number): number {
    return setInterval(() => {
      console.log('Sending Heartbeat.');
      this.socket.send(JSON.stringify(Heartbeat));
    }, ms);
  }

  private async identify(token: string) {
    Identify.d.token = token;
    this.socket.send(JSON.stringify(Identify));
  }
}