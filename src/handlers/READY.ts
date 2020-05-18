import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payload.ts";
import { Events } from '../constants/Events.ts';
import RestAPIHandler from '../rest/RestAPIHandler.ts';
import ClientUser from "../client/ClientUser.ts";
import Guild from "../models/Guild.ts";
import Role from "../models/Role.ts";

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

  const now = performance.now();
  
  for (const g of guilds) {
    const guild: any = await RestAPIHandler.fetchGuild(client.token, g.id);
    const rolesArray = guild.roles;
    const roles = new Map();
    for (const role of rolesArray) {
      roles.set(role.id, new Role(
        role.id,
        role.name,
        role.color,
        role.hoist,
        role.position,
        role.permissions,
        role.managed,
        role.mentionable 
      ));
    }
    
    const newGuild = new Guild(
      guild.id,
      guild.name,
      guild.icon,
      guild.description,
      guild.splash,
      guild.discovery_splash,
      guild.features,
      guild.emojis,
      guild.banner,
      guild.owner_id,
      guild.application_id,
      guild.region,
      guild.afk_channel_id,
      guild.afk_timeout,
      guild.system_channel_id,
      guild.widget_enabled,
      guild.widget_channel_id,
      guild.verification_level,
      roles,
      guild.default_message_notifications,
      guild.mfa_level,
      guild.explicit_content_filter,
      guild.max_presences,
      guild.max_members,
      guild.max_video_channel_users,
      guild.vanity_url_code,
      guild.premium_tier,
      guild.premium_subscription_count,
      guild.system_channel_flags,
      guild.preferred_locale,
      guild.rules_channel_id,
      guild.public_updates_channel_id,
      guild.embed_enabled,
      guild.embed_channel_id,
    );
    client.guilds.set(newGuild.id, newGuild);
  }
  const end = performance.now();

  console.log(`Duration: ${end-now}ms`)
  client.emit(Events.READY);
}