import User from "./User.ts";
import Collection from "./Collection.ts";
import Role from "./Role.ts";

export default class GuildMember {
  constructor(
    private _id: string,
    private _user: User,
    private _nickname: string,
    private _roles: Collection<string, Role>,
    private _joinedAt: Date,
    private _premiumSince: Date,
    private _deaf: boolean,
    private _mute: boolean,
  ) {
  }

  public get id(): string { return this._id; }
  public get user(): User {
    return this._user;
  }
  public get nickname(): string {
    return this._nickname;
  }
  public get roles(): Collection<string, Role> {
    return this._roles;
  }
  public get joinedAt(): Date {
    return this._joinedAt;
  }
  public get premiumSince(): Date {
    return this._premiumSince;
  }
  public get deaf(): boolean {
    return this._deaf;
  }
  public get mute(): boolean {
    return this._mute;
  }
}
