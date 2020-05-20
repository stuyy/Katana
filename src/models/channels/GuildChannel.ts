import Guild from '../Guild.ts';
import BaseChannel from '../channels/BaseChannel.ts';
import { Client } from '../../client/Client.ts';
import { ChannelType } from '../../constants/Constants.ts';

export default class GuildChannel extends BaseChannel {

  private _lastMessageId: string;
  private _lastPinTimestamp: Date;
  private _name: string;
  private _position: number;
  private _parentId: string;
  private _topic: string;
  private _guild: Guild;
  private _permissionOverwrites: Array<any>;
  private _nsfw: boolean;
  private _rateLimitPerUser: number;

  constructor(
    _id: string,
    _client: Client,
    _type: ChannelType,
    _lastMessageId: string,
    _lastPinTimestamp: Date,
    _name: string,
    _position: number,
    _parentId: string,
    _topic: string,
    _guild: Guild,
    _permissionOverwrites: Array<any>,
    _nsfw: boolean,
    _rateLimitPerUser: number,
  ) {
    super(_client, _id, _type);
    this._lastMessageId = _lastMessageId;
    this._lastPinTimestamp = _lastPinTimestamp;
    this._name = _name;
    this._position = _position;
    this._parentId = _parentId;
    this._topic = _topic;
    this._guild = _guild;
    this._permissionOverwrites = _permissionOverwrites;
    this._nsfw = _nsfw;
    this._rateLimitPerUser = _rateLimitPerUser;
  }
  
  public get lastMessageId(): string { return this._lastMessageId; }
  public get lastPinTimestamp(): Date { return this._lastPinTimestamp; }
  public get name(): string { return this._name; }
  public get position(): number { return this._position; }
  public get parentId(): string { return this._parentId; }
  public get topic(): string { return this._topic }
  public get guild(): Guild { return this._guild; }
  public get permissionOverwrites(): Array<any> { return this._permissionOverwrites; }
  public get nsfw(): boolean { return this._nsfw; }
  public get rateLimitPerUser(): number { return this._rateLimitPerUser; }

}