import Role from "./Role.ts";
import Collection from './Collection.ts';
import User from './User.ts';

export default class Emoji {
  constructor(
    private _id: string,
    private _name: string,
    private _roles: Collection<string, Role>,
    private _users: Collection<string, User>,
    private _required_colons: boolean,
    private _managed: boolean,
    private _animated: boolean,
    private _available: boolean,
  ) {
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get roles(): Collection<string, Role> { return this._roles; }
  get users(): Collection<string, User> { return this._users; }
  get requiredColons(): boolean { return this._required_colons; }
  get managed(): boolean { return this._managed; }
  get animated(): boolean { return this._animated; }
  get available(): boolean { return this._available; }

}
