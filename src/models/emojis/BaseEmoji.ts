import Collection from '../Collection.ts';
import Role from '../Role.ts';
import User from '../User.ts';

export class BaseEmoji {

  constructor(
    private _id: string | null,
    private _name: string,
    private _roles: Collection<string, Role> | null,
    private _user: User | null,
    private _requiredColons: boolean | null,
    private _managed: boolean | null,
    private _animated: boolean | null,
    private _available: boolean | null,
  ) {
  
  }

  get id(): string | null { return this._id; }
  get name(): string | undefined { return this._name; }
  get roles(): Collection<string, Role> | null { return this._roles; }
  get user(): User | null { return this._user; }
  get requiredColons(): boolean | null { return this._requiredColons; }
  get managed(): boolean | null { return this._managed; }
  get animated(): boolean | null { return this._animated; }
  get available(): boolean | null { return this._available; }

}