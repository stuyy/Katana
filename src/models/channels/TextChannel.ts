import Guild from "../Guild.ts";
import Client from "../../client/Client.ts";
import { GuildChannel } from "./GuildChannel.ts";
import { ChannelTypeDef } from "../../typedefs/ChannelType.ts";
import TextBasedChannel from "../interfaces/ITextChannel.ts";
import { MessageOptions } from "../../typedefs/MessageOptions.ts";
import Collection from "../Collection.ts";
import { Message } from "../Message.ts";
import { buildMessage } from '../../utils/resolvers.ts';
import { MessageEmbed } from '../embeds/Embeds.ts';
import { MessageCollectorOptions } from '../../typedefs/CollectorOptions.ts';
import { MessageCollector } from '../collectors/MessageCollector.ts';

export class TextChannel extends GuildChannel implements TextBasedChannel {

  private _messages: Collection<string, Message> = new Collection();
  
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

  get messages(): Collection<string, Message> { return this._messages; }

  async send(payload: string | MessageOptions | MessageEmbed) {
    if (typeof payload === "string") {
      const body: MessageOptions = { content: payload };
      const response = await this.client.rest.createMessage(body, this.id);
      response.guild_id = this.guild.id;
      return await buildMessage(this.client, response);
    }
    if (payload instanceof MessageEmbed) {
      const options: MessageOptions = {
        embed: payload
      }
      const response = await this.client.rest.createMessage(options, this.id);
      response.guild_id = this.guild.id;
      return await buildMessage(this.client, response);
    }
    const response = await this.client.rest.createMessage(payload, this.id);
    response.guild_id = this.guild.id;
    return await buildMessage(this.client, response);
  }

  async awaitMessages(filter: Function, options?: MessageCollectorOptions): Promise<Collection<string, Message>> {
    return new Promise((resolve, reject) => {
      const collector = new MessageCollector(this, filter, options);
      collector.on('end', (collected: Collection<string, Message>) => {
        resolve(collected);
      });
    })
  }
}
