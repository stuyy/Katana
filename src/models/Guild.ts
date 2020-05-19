import Role from "./Role.ts";
import Emoji from "./Emoji.ts";
import GuildChannel from "./GuildChannel.ts";

export default class Guild {

  private _channels: Map<string, GuildChannel> = new Map();

  constructor(
    private _id: string,
    private name: string,
    private icon: string,
    private description: string,
    private splash: string,
    private discoverySplash: string,
    private features: Array<any>,
    private _emojis: Map<string, Emoji>,
    private banner: string,
    private ownerId: string,
    private applicationId: string,
    private region: string,
    private afkChannelId: string,
    private afkTimeout: string,
    private systemChannelId: string,
    private widgetEnabled: boolean,
    private widgetChannelId: string,
    private verificationLevel: number,
    private _roles: Map<string, Role> =  new Map(),
    private defaultMessageNotifications: number,
    private mfaLevel: number,
    private explicitContentFilter: number,
    private maxPresences: number,
    private maxMembers: number,
    private maxVideoChannelUsers: number,
    private vanityUrl: string,
    private premiumTier: number,
    private premiumSubscriptionCount: number,
    private systemChannelFlags: number,
    private preferredLocale: string,
    private rulesChannelId: string,
    private publicUpdatesChannelId: string,
    private embedEnabled: boolean,
    private embedChannelId: string
  ) {
    
  }

  public get id(): string {
    return this._id;
  }

  public get roles(): Map<string, Role> {
    return this._roles;
  }

  public get emojis(): Map<string, Emoji> {
    return this._emojis;
  }

  public get channels(): Map<string, GuildChannel> {
    return this._channels;
  }

  public set channels(channels: Map<string, GuildChannel>) {
    this._channels = channels;
  }

}