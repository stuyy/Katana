import { Client } from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";
import { Events } from '../constants/Events.ts';
import RestAPIHandler from '../client/rest/RestAPIHandler.ts';
import ClientUser from "../client/ClientUser.ts";
import Guild from "../models/Guild.ts";
import Role from "../models/Role.ts";
import Emoji from '../models/Emoji.ts';
import GuildChannel from "../models/GuildChannel.ts";

export default async function (client: Client, payload: Payload) {

  const { user, guilds } = payload.d;

  const now = performance.now();

  client.user = new ClientUser(
    user.username,
    user.discriminator,
    user.verified,
    user.id,
    user.flags,
    user.email,
    user.bot,
    user.avatar
  );
  const end = performance.now();

  console.log(`Duration: ${end-now}ms`);
  client.emit(Events.READY);
}