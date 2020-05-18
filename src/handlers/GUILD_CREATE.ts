import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";
import { Events } from '../constants/Events.ts';

export default async function (client: Client, payload: Payload) {
  client.emit(Events.GUILD_CREATE);
}