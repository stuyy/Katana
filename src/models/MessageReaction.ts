import Client from '../client/Client.ts';
import Emoji from './Emoji.ts';
import Collection from './Collection.ts';
import User from './User.ts';
import { Message } from './Message.ts';

export class MessageReaction {
  constructor(
    private _client: Client,
    private _emoji: Emoji,
    private _message: Message,
    private _me: boolean,
    private _users: Collection<string, User>
  ) {

  }

  fetch() {}
  remove() {}

  get count(): Client { return this._client; }
  get emoji(): Emoji { return this._emoji; }
  get message(): Message { return this._message; }
  get me(): boolean { return this._me; }
  get users(): Collection<string, User> { return this._users; }

}

