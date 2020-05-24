import Client from "../client/Client.ts";
import { Payload } from "../constants/Payloads.ts";
import { Events } from "../constants/Events.ts";
import {
  resolveChannels,
  resolveEmojis,
  resolveRoles,
  buildGuildInstance,
  resolveGuildMembersAndUsers,
} from "../utils/resolvers.ts";

export default async function (client: Client, payload: Payload) {
  const { d: guild } = payload;
  if (client.guilds.has(guild.id)) {
    const cachedGuild = client.guilds.get(guild.id);
    client.emit(Events.GUILD_CREATE, cachedGuild);
  } else {
    let response = await client.rest.fetchChannels(guild.id);
    const roles = resolveRoles(client, guild.roles);
    const emojis = resolveEmojis(client, guild.emojis);
    const newGuild = buildGuildInstance(guild);
    const channels = resolveChannels(client, guild, response);
    const members = resolveGuildMembersAndUsers(client, newGuild, guild.members);

    newGuild.channels = channels;
    newGuild.members = members;
    newGuild.emojis = emojis;
    newGuild.roles = roles;
  
    client.guilds.set(newGuild.id, newGuild);
    client.emit(Events.GUILD_CREATE, newGuild);
  }
}
