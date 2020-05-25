import Guild from "../Guild.ts";
import Client from "../../client/Client.ts";
import { ChannelTypeDef } from "../../typedefs/ChannelType.ts";
import TextBasedChannel from "../interfaces/ITextChannel.ts";
import { MessageOptions } from "../../typedefs/MessageOptions.ts";
import Collection from "../Collection.ts";
import { Message } from "../Message.ts";
import { buildMessage } from '../../utils/resolvers.ts';
import { MessageEmbed } from '../embeds/Embeds.ts';
import { BaseChannel } from '../../../mod.ts';

export class DMChannel extends BaseChannel {

   _messages: Collection<string, Message> = new Collection();
  
  constructor(
    _id: string,
    _client: Client,
    _type: ChannelTypeDef,
    _lastMessageId: string,
    _lastPinTimestamp: Date,
    _name: string,
    _position: number,
  ) {
    super(_client, _id, _name, _type);
  }

  get messages(): Collection<string, Message> { return this._messages; }

  async send(payload: string | MessageOptions | MessageEmbed) {
    if (typeof payload === "string") {
      const body: MessageOptions = { content: payload };
      const response = await this.client.rest.createMessage(body, this.id);
      return await buildMessage(this.client, response);
    }
    if (payload instanceof MessageEmbed) {
      const options: MessageOptions = {
        embed: payload
      }
      const response = await this.client.rest.createMessage(options, this.id);
      return await buildMessage(this.client, response);
    }
    const response = await this.client.rest.createMessage(payload, this.id);
    return await buildMessage(this.client, response);
  }
}
