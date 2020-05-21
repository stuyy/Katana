import { GuildChannel } from "./channels/GuildChannel.ts";
import Guild from "./Guild.ts";
import User from "./User.ts";
import { TextChannel } from "./channels/TextChannel.ts";

export default class Message {
  constructor(
    private id: string,
    private _channel: TextChannel,
    private guild: Guild,
    private author: User,
    private member: any,
    private _content: string,
    private timestamp: Date,
    private editedAt: Date,
    private tts: boolean,
    private mentionedEveryone: boolean,
    private attachments: Array<any>,
    private embeds: Array<any>,
    private reactions: Array<any>,
    private nonce: number | string,
    private pinned: boolean,
    private type: number,
  ) {
  }

  public get content(): string {
    return this._content;
  }
  public get channel(): TextChannel {
    return this._channel;
  }
}
