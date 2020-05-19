import Guild from "../Guild.ts";
import { Client } from "../../client/Client.ts";

export default abstract class TextBasedChannel {
  
  
  constructor(
    private _id: string,
    private _lastMessageId: string,
    private _lastPinTimestamp: Date,
    private _type: number,
    private _name: string,
    private _position: number,
    private _parentId: string,
    private _topic: string,
    private _guild: Guild,
    private _permissionOverwrites: Array<any>,
    private _nsfw: boolean,
    private _rateLimitPerUser: number,
    private _client: Client
  ) {
    
  }

  public abstract send(): Promise<any>;

  public get id(): string { return this._id; }
  public get lastMessageId(): string { return this._lastMessageId; }
  public get lastPinTimestamp(): Date { return this._lastPinTimestamp; }
  public get type(): number { return this._type; }
  public get name(): string { return this._name; }
  public get position(): number { return this._position; }
  public get parentId(): string { return this._parentId; }
  public get topic(): string { return this._topic; }
  public get guild(): Guild { return this._guild; }
  public get permissionOverwrites(): Array<any> { return this._permissionOverwrites; }
  public get nsfw(): boolean { return this._nsfw; }
  public get rateLimitPerUser(): number { return this._rateLimitPerUser; }
  public get client(): Client { return this._client; }
}