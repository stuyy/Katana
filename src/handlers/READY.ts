import { Client } from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";
import { Events } from '../constants/Events.ts';
import RestAPIHandler from '../client/rest/RestAPIHandler.ts';
import ClientUser from "../client/ClientUser.ts";
import Guild from "../models/Guild.ts";
import Role from "../models/Role.ts";
import Emoji from '../models/Emoji.ts';
import GuildChannel from "../models/GuildChannel.ts";
import { resolveRoles, resolveEmojis, buildGuildInstance, resolveChannels } from "../utils/resolvers.ts";

export default async function (client: Client, payload: Payload) {

  const { user, guilds } = payload.d;

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
  console.log(client.guilds.size);
  const now = performance.now();
  for (const g of guilds) {
    if (!client.guilds.has(g.id)) {
      const guild: any = await client.rest.fetchGuild(g.id);
      const channelsResponse: any = await client.rest.fetchChannels(guild.id);
      const roles = resolveRoles(client, guild.roles);
      const emojis = resolveEmojis(client, guild.emojis);
      const newGuild = buildGuildInstance(roles, emojis, guild);
      const channels = resolveChannels(client, newGuild, channelsResponse);
      newGuild.channels = channels;
      console.log('New Guild Created');
      console.log(newGuild.name);
      client.guilds.set(newGuild.id, newGuild);
    }
  }
  const end = performance.now();

  console.log(`Duration: ${end-now}ms`);
  client.emit(Events.READY);
}