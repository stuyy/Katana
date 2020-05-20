import GuildChannel from "./channels/GuildChannel.ts";
import Guild from "./Guild.ts";
import User from "./User.ts";
import { Client } from "../client/Client.ts";

export default class Message {

  constructor(
    private id: string,
    private channel: GuildChannel,
    private guild: Guild,
    private author: User,
    private member: any,
    private content: string,
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
    private client: Client
  ) {

  }
}