import Client from '../../client/Client.ts';
import { ChannelTypeDef } from '../../typedefs/ChannelType.ts';

export class BaseChannel {

	constructor(
		private _client: Client,
		private _id: string,
		private _name: string | null,
		private _type: ChannelTypeDef) {
	}

	public get name(): string | null { return this._name; }
	public set name(name: string | null) { this._name = name; }
	public get client(): Client { return this._client; }
	public get id(): string { return this._id; }
	public get type(): ChannelTypeDef { return this._type; }
}