import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  connectWebSocket,
} from "https://deno.land/std/ws/mod.ts";

import Constants from './constants/Constants.ts';

try {
  const socket = await connectWebSocket(Constants.GATEWAY);
  console.log('Connected.');
  for await (const m of socket) {
    const payload = JSON.parse(m.toString());
    console.log(payload);
    const { t, s, op, d } = payload;
    const { heartbeat_interval } = d;
    console.log(heartbeat_interval);
    if (op == 10) {
      const p = {
        op: 1,
        d: null,
      };

      setInterval(() => {
        console.log(`Sending heartbeat every ${heartbeat_interval} ms...`)
        socket.send(JSON.stringify(p));
      }, heartbeat_interval);
    }
  }
} catch (err) {
  console.log(err);
}
