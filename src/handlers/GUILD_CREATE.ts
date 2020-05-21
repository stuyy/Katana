import Client from "../client/Client.ts";
import { Payload } from "../constants/Payloads.ts";
import { Events } from '../constants/Events.ts';
import { resolveChannels, resolveEmojis, resolveRoles, buildGuildInstance, resolveGuildMembersAndUsers } from '../utils/resolvers.ts';

export default async function (client: Client, payload: Payload) {

  const { d: guild } = payload;
  if (client.guilds.has(payload.d.id)) {
    const cachedGuild = client.guilds.get(guild.id);
    client.emit(Events.GUILD_CREATE, cachedGuild);
  } else {
    const now = performance.now();
    let response = await client.rest.fetchChannels(guild.id);
    const roles = resolveRoles(client, guild.roles);
    const emojis = resolveEmojis(client, guild.emojis);
    const newGuild = buildGuildInstance(roles, emojis, guild);
    const channels = resolveChannels(client, guild, response);
    const members = resolveGuildMembersAndUsers(client, newGuild, guild.members);
    console.log(members.size);
    newGuild.channels = channels;
    newGuild.members = members;
    client.guilds.set(newGuild.id, newGuild);
    const end = performance.now();
    const diff = end-now;
    console.log(`Took ${diff}ms...`);
    client.emit(Events.GUILD_CREATE, newGuild);
  }
}
