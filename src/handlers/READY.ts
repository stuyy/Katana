import Client from "../client/Client.ts";
import { Payload } from "../constants/Payloads.ts";
import { Events } from "../constants/Events.ts";
import ClientUser from "../client/ClientUser.ts";
import {
  resolveRoles,
  resolveEmojis,
  buildGuildInstance,
  resolveChannels,
  resolveGuildMembersAndUsers,
} from "../utils/resolvers.ts";

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
    user.avatar,
  );
  for (const g of guilds) {
    if (!client.guilds.has(g.id)) {
      const fetchedGuild: any = await client.rest.fetchGuild(g.id);
      const fetchedMembers: any = await client.rest.fetchGuildMembers(
        g.id,
        fetchedGuild.approximate_member_count,
      );
      const fetchedChannels: any = await client.rest.fetchChannels(
        fetchedGuild.id,
      );
      const roles = resolveRoles(client, fetchedGuild.roles);
      const emojis = resolveEmojis(client, fetchedGuild.emojis);
      const newGuild = buildGuildInstance(fetchedGuild);
      const channels = resolveChannels(client, newGuild, fetchedChannels);
      const members = resolveGuildMembersAndUsers(client, newGuild, fetchedMembers);
      newGuild.channels = channels;
      newGuild.members = members;
      newGuild.emojis = emojis;
      newGuild.roles = roles;
      client.guilds.set(newGuild.id, newGuild);
    }
  }
  client.emit(Events.READY);
}
