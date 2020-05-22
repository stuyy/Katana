import Guild from "./Guild.ts";
import User from "./User.ts";
import { TextChannel } from "./channels/TextChannel.ts";
import GuildMember from './GuildMember.ts';
import { MessageDeleteOptions } from '../typedefs/MessageOptions.ts';
import { StatusCode } from '../constants/Constants.ts';
import { MessageReaction } from './MessageReaction.ts';

export default class Message {
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
    private _attachments: Array<any>,
    private _embeds: Array<any>,
    private _reactions: Array<any>,
    private _nonce: number | string,
    private _pinned: boolean,
    private _type: number,
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
  public get embeds(): Array<any> { return this._embeds; }
  public get reactions(): Array<any> { return this._reactions; }
  public get nonce(): number | string { return this._nonce; }
  public get pinned(): boolean { return this._pinned; }
  public get type(): number { return this._type; }
  public get content(): string { return this._content; }

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
   * 
   * @param emoji the emoji to add to the Message
   */
  public async react(emoji: any) {
    try {
      await this.channel.client.rest.createReaction(this.channel.id, this.id, emoji);
      // return new MessageReaction(this.channel.client, 1, this.guild.emojis.get(emoji), this, true, )
    } catch (err) {
      throw err;
    }
  }
}
