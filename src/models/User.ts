import Client from '../client/Client.ts';

export default class User {

  constructor(
    private _id: string,
    private _username: string,
    private _discriminator: string,
    private _avatar: string,
    private _bot: boolean = false,
    private _system: boolean,
    private _mfaEnabled: boolean = false,
    private _locale: boolean = false,
    private _verified: boolean = false,
    private _flags: number,
    private _premiumType: number,
    private _publicFlags: number,
    private _client: Client,
  ) {

  }
  /**
   * Getter id
   * @return {string}
   */
	public get id(): string {
		return this._id;
	}

  /**
   * Getter username
   * @return {string}
   */
	public get username(): string {
		return this._username;
	}

  /**
   * Getter discriminator
   * @return {string}
   */
	public get discriminator(): string {
		return this._discriminator;
	}

  /**
   * Getter avatar
   * @return {string}
   */
	public get avatar(): string {
		return this._avatar;
	}

  /**
   * Getter bot
   * @return {boolean}
   */
	public get bot(): boolean {
		return this._bot;
	}

  /**
   * Getter system
   * @return {boolean}
   */
	public get system(): boolean {
		return this._system;
	}

  /**
   * Getter mfaEnabled
   * @return {boolean}
  */
	public get mfaEnabled(): boolean {
		return this._mfaEnabled;
	}

  /**
   * Getter locale
   * @return {boolean}
   */
	public get locale(): boolean {
		return this._locale;
	}

  /**
   * Getter verified
   * @return {boolean}
   */
	public get verified(): boolean {
		return this._verified;
	}

  /**
   * Getter flags
   * @return {number}
   */
	public get flags(): number {
		return this._flags;
	}

  /**
   * Getter premiumType
   * @return {number}
   */
	public get premiumType(): number {
		return this._premiumType;
  }
  
  public get client(): Client {
    return this._client;
  }
}