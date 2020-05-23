export default class ClientUser {
  constructor(
    private _username: string,
    private _discriminator: string,
    private _verified: boolean,
    private _id: string,
    private _flags: number,
    private _email: string | null,
    private _bot: boolean,
    private _avatar: string,
  ) {
  }
  
  get username(): string { return this._username; }
  get discriminator(): string { return this._discriminator; }
  get verified(): boolean { return this._verified; }
  get id(): string { return this._id; }
  get flags(): number { return this._flags; }
  get email(): string | null { return this._email; }
  get bot(): boolean { return this._bot; }
  get avatar(): string { return this._avatar; }
}
