import Guild from "./Guild.ts";
import User from "./User.ts";
import { TextChannel } from "./channels/TextChannel.ts";
import GuildMember from './GuildMember.ts';
import { MessageDeleteOptions } from '../typedefs/MessageOptions.ts';
import { MessageReaction } from './MessageReaction.ts';
import { validateEmoji, checkGuildEmoji } from '../utils/checks.ts';
import { MessageEmbed } from './embeds/Embeds.ts';
import Collection from './Collection.ts';

export default class Message {
  
  private _embeds: Array<MessageEmbed> = [];
  private _attachments: Array<any> = [];
  private _reactions: Collection<string, MessageReaction> = new Collection();

  constructor(
    private _id: string,
    private _channel: TextChannel,
    private _guild: Guild,
    private _author: User,
    private _member: any,
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

  public get id(): string { return this._id; }
  public get channel(): TextChannel { return this._channel; }
  public get user(): User { return this._author; }
  public get guild(): Guild { return this._guild; }
  public get member(): GuildMember { return this._member; }
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
        return new MessageReaction(this.channel.client, guildEmoji, this, true);
      }
      throw new Error('Invalid Emoji.');
    }
    if (result) {
      const guildEmoji = checkGuildEmoji(result, this.channel.client);
      if (guildEmoji) {
        const emojiFormat = `${guildEmoji.name}:${guildEmoji.id}`;
        await this.channel.client.rest.createReaction(this.channel.id, this.id, emojiFormat);
        return new MessageReaction(this.channel.client, guildEmoji, this, true);
      } throw new Error('Invalid Emoji.');
    }
    await this.channel.client.rest.createReaction(this.channel.id, this.id, emoji);
    return null;
  }

  public async edit(payload: string | MessageEmbed) {
    console.log('Going to edit...');
    console.log(payload);
    if (typeof payload === 'string')
      return this.channel.client.rest.editMessage({ content: payload }, this.channel.id, this.id);
    if (payload instanceof MessageEmbed)
      return this.channel.client.rest.editMessage({ embed: payload }, this.channel.id, this.id);
  }
}



