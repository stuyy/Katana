import Guild from "../Guild.ts";
import Client from "../../client/Client.ts";
import { GuildChannel } from "./GuildChannel.ts";
import { ChannelTypeDef } from "../../typedefs/ChannelType.ts";
import TextBasedChannel from "../interfaces/ITextChannel.ts";
import { MessageOptions } from "../../typedefs/MessageOptions.ts";
import Collection from "../Collection.ts";
import Message from "../Message.ts";

export class TextChannel extends GuildChannel implements TextBasedChannel {

  private _messages: Collection<string, Message> = new Mes
  constructor(
    _id: string,
    _client: Client,
    _type: ChannelTypeDef,
    _lastMessageId: string,
    _lastPinTimestamp: Date,
    _name: string,
    _position: number,
    _parentId: string,
    _topic: string,
    _guild: Guild,
    _permissionOverwrites: Array<any>,
    _nsfw: boolean,
    _rateLimitPerUser: number,
  ) {
    super(
      _id,
      _client,
      _type,
      _lastMessageId,
      _lastPinTimestamp,
      _name,
      _position,
      _parentId,
      _topic,
      _guild,
      _permissionOverwrites,
      _nsfw,
      _rateLimitPerUser,
    );
  }

  send(payload: string | MessageOptions): any {
    if (typeof payload === "string") {
      const body: MessageOptions = { content: payload };
      const response = this.client.rest.createMessage(body, this.id);
      return;
    }

    if (payload) {
      console.log(payload);
      const response = this.client.rest.createMessage(payload, this.id);
      return;
    }
  }
}
