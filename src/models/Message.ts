import Guild from "./Guild.ts";
import User from "./User.ts";
import { TextChannel } from "./channels/TextChannel.ts";
import GuildMember from './GuildMember.ts';
import { MessageDeleteOptions } from '../typedefs/MessageOptions.ts';
import { MessageReaction } from './MessageReaction.ts';
import { validateEmoji, checkGuildEmoji } from '../utils/checks.ts';
import { MessageEmbed } from './embeds/Embeds.ts';
import Collection from './Collection.ts';
import { buildMessage } from '../utils/resolvers.ts';
import { Client } from '../../mod.ts';
import { ReactionCollectorOptions } from '../typedefs/CollectorOptions.ts';
import { ReactionCollector } from './collectors/ReactionCollector.ts';

export class Message {
  
  /**
   * Array of MessageEmbed objects
   */
  private _embeds: Array<MessageEmbed> = [];
  /**
   * Array  of Attachments
   */
  private _attachments: Array<any> = [];
  /**
   * Array of message reactions
   */
  private _reactions: Collection<string, MessageReaction> = new Collection();
  /**
   * Creates an instance of message.
   * @param _id id of the message
   * @param _channel channel the message was sent in
   * @param _guild the guild the message was sent in
   * @param _author the author of the message
   * @param _member the member of the message
   * @param _content the message content
   * @param _timestamp the time the message was sent at
   * @param _editedAt the time the message was edited at
   * @param _tts whether this message is tts 
   * @param _mentionedEveryone whether this message mentions everyone
   * @param _nonce 
   * @param _pinned 
   * @param _type 
   */
  constructor(
    private _client: Client,
    private _id: string,
    private _channel: TextChannel,
    private _guild: Guild | null,
    private _author: User,
    private _member: any | null,
    private _content: string,
    private _timestamp: Date,
    private _editedAt: Date,
    private _tts: boolean,
    private _mentionedEveryone: boolean,
    private _nonce: number | string,
    private _pinned: boolean,
    private _type: number
  ) {

  }

  public get client(): Client { return this._client; }
  public get id(): string { return this._id; }
  public get channel(): TextChannel { return this._channel; }
  public get user(): User { return this._author; }
  public get guild(): Guild | null { return this._guild; }
  public get member(): GuildMember | null { return this._member; }
  public get timestamp(): Date { return this._timestamp; }
  public get editedAt(): Date { return this._editedAt; }
  public get tts(): boolean { return this._tts; }
  public get mentionedEveryone(): boolean { return this._mentionedEveryone; }
  public get attachments(): Array<any> { return this._attachments; }
  public get embeds(): Array<MessageEmbed> { return this._embeds; }
  public get reactions(): Collection<string, MessageReaction> { return this._reactions; }
  public get nonce(): number | string { return this._nonce; }
  public get pinned(): boolean { return this._pinned; }
  public get type(): number { return this._type; }
  public get content(): string { return this._content; }

  public set embeds(embeds: Array<MessageEmbed>) {
    this._embeds = embeds;
  }
  
  /**
   * Deletes message
   * @param [options] - The options for deleting the message.
   * @returns Promise<Message> the message that was deleted
   */
  public delete(options?: MessageDeleteOptions): Promise<Message> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await this.channel.client.rest.deleteMessage(this.channel.id, this.id);
          resolve(this);
        } catch (err) {
          reject(err);
        }
      }, options?.timeout || 0);
    });
  }
  
  /**
   * Reacts to a message
   * @param emoji - the emoji id, name joined with id, or a unicode emoji
   * @returns ReactionMessage - the reaction that was added
   */
  public async react(emoji: string): Promise<MessageReaction | null> {
    const result = validateEmoji(emoji);
    if (Array.isArray(result)) {
      const [name,id] = result;
      const guildEmoji = checkGuildEmoji(id, this.channel.client);
      if (guildEmoji && guildEmoji.name === name) {
        const emojiFormat = `${guildEmoji.name}:${guildEmoji.id}`;
        await this.channel.client.rest.createReaction(this.channel.id, this.id, emojiFormat);
        return new MessageReaction(this.channel.client, guildEmoji, this, true, new Collection<string, User>());
      }
      throw new Error('Invalid Emoji.');
    }
    if (result) {
      const guildEmoji = checkGuildEmoji(result, this.channel.client);
      if (guildEmoji) {
        const emojiFormat = `${guildEmoji.name}:${guildEmoji.id}`;
        await this.channel.client.rest.createReaction(this.channel.id, this.id, emojiFormat);
        return new MessageReaction(this.channel.client, guildEmoji, this, true, new Collection<string, User>());
      } throw new Error('Invalid Emoji.');
    }
    await this.channel.client.rest.createReaction(this.channel.id, this.id, emoji);
    return null;
  }
  /**
   * Edits the message
   * @param payload string or message embed 
   * @returns null
   */
  public async edit(payload: string | MessageEmbed) {
    if (typeof payload === 'string')
      return this.channel.client.rest.editMessage({ content: payload }, this.channel.id, this.id);
    if (payload instanceof MessageEmbed)
      return this.channel.client.rest.editMessage({ embed: payload }, this.channel.id, this.id);
  }

  /**
   * Fetchs message
   * @returns Promise<Message> the message that was fetched
   */
  public async fetch(): Promise<Message> {
    if (this.channel.messages.has(this.id)) {
      console.log('In cache');
      return this;
    }
    else {
      const response = await this.channel.client.rest.fetchMessage(this.channel.id, this.id);
      return await buildMessage(this.channel.client, response);
    }
  }

  public async pin(): Promise<Message> {
    await this.channel.client.rest.pinMessage(this.channel.id, this.id);
    return this;
  }

  public async unpin(): Promise<Message> {
    await this.channel.client.rest.unpinMessage(this.channel.id, this.id);
    return this;
  }

  public async awaitReactions(filter: Function, options?: ReactionCollectorOptions) {
    return new Promise((resolve, reject) => {
      const collector = new ReactionCollector(this, filter, options);
      collector.on('end', (collected: Collection<string, MessageReaction>) => {
        resolve(collected);
      });
    });
  }
}



