import Role from "./Role.ts";
import Emoji from "./Emoji.ts";
import { GuildChannel } from "./channels/GuildChannel.ts";
import Collection from "./Collection.ts";
import GuildMember from "./GuildMember.ts";

export default class Guild {

  private _channels: Collection<string, GuildChannel> = new Collection();
  private _members: Collection<string, GuildMember> = new Collection();
  private _emojis: Collection<string, Emoji> = new Collection();
  private _roles: Collection<string, Role> = new Collection();

  constructor(
    private _id: string,
    private _name: string,
    private _icon: string,
    private _description: string,
    private _splash: string,
    private _discoverySplash: string,
    private _features: Array<any>,
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
    private _embedChannelId: string,
  ) {

  }

  public get roles(): Collection<string, Role> { return this._roles; }
  public set roles(roles: Collection<string, Role>) { this._roles = roles; }

  public get emojis(): Collection<string, Emoji> { return this._emojis; }
  public set emojis(emojis: Collection<string, Emoji>) { this._emojis = emojis; }

  public get channels(): Collection<string, GuildChannel> { return this._channels; }
  public set channels(channels: Collection<string, GuildChannel>) { this._channels = channels; }

  public get name() { return this._name; }
  public set name(name: string) { this._name = name; }

  public get members(): Collection<string, GuildMember> { return this._members; }
  public set members(members: Collection<string, GuildMember>) { this._members = members; }

  public get id(): string { return this._id; }
  public get icon(): string { return this._icon; }

  public get description(): string { return this._description; }
  public get splash(): string { return this._splash; }

}
