import Role from "./Role.ts";
import Emoji from "./Emoji.ts";
import { GuildChannel } from "./channels/GuildChannel.ts";

export default class Guild {

  private _channels: Map<string, GuildChannel> = new Map();

  constructor(
    private _id: string,
    private _name: string,
    private _icon: string,
    private _description: string,
    private _splash: string,
    private _discoverySplash: string,
    private _features: Array<any>,
    private _emojis: Map<string, Emoji>,
    private _banner: string,
    private _ownerId: string,
    private _applicationId: string,
    private _region: string,
    private _afkChannelId: string,
    private _afkTimeout: string,
    private _systemChannelId: string,
    private _widgetEnabled: boolean,
    private _widgetChannelId: string,
    private _verificationLevel: number,
    private _roles: Map<string, Role> =  new Map(),
    private _defaultMessageNotifications: number,
    private _mfaLevel: number,
    private _explicitContentFilter: number,
    private _maxPresences: number,
    private _maxMembers: number,
    private _maxVideoChannelUsers: number,
    private _vanityUrl: string,
    private _premiumTier: number,
    private _premiumSubscriptionCount: number,
    private _systemChannelFlags: number,
    private _preferredLocale: string,
    private _rulesChannelId: string,
    private _publicUpdatesChannelId: string,
    private _embedEnabled: boolean,
    private _embedChannelId: string
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

  public get name() { return this._name; }
  

}