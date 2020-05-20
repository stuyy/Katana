
import { Client } from '../../client/Client.ts';
import { ChannelType } from '../../constants/Constants.ts';

export default class BaseChannel {

	constructor(
		private _client: Client,
		private _id: string,
		private _type: ChannelType) {
	}

	public get client(): Client { return this._client; }
	public get id(): string { return this._id; }
	public get type(): ChannelType { return this._type; }
}