import Role from "./Role.ts";

export default class Guild {

  constructor(
    private _id: string,
    private name: string,
    private icon: string,
    private description: string,
    private splash: string,
    private discoverySplash: string,
    private features: Array<any>,
    private emojis: Array<any>,
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
}