import Guild from "./Guild.ts";
import TextBasedChannel from "./channels/TextBasedChannel.ts";
import { Client } from "../client/Client.ts";

export default class GuildChannel extends TextBasedChannel {

  constructor(
    id: string,
    lastMessageId: string,
    lastPinTimestamp: Date,
    type: number,
    name: string,
    position: number,
    parentId: string,
    topic: string,
    guild: Guild,
    permissionOverwrites: Array<any>,
    nsfw: boolean,
    rateLimitPerUser: number,
    client: Client
  ) {
    super(id, lastMessageId, lastPinTimestamp, type, name, position, parentId, topic, guild, permissionOverwrites, nsfw, rateLimitPerUser, client);
  }

  send() {

    return Promise.resolve(200);
  }
}