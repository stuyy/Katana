import EventEmitter from "https://deno.land/std@0.51.0/node/events.ts";
import Client from '../../client/Client.ts';
import { MessageCollectorOptions, ReactionCollectorOptions } from '../../typedefs/CollectorOptions.ts';
import Collection from '../Collection.ts';
import { Message } from '../Message.ts';
import { MessageReaction } from '../MessageReaction.ts';

export abstract class BaseCollector extends EventEmitter {

  private _collected: Collection<string, Message> | Collection<string, MessageReaction> = new Collection();

  constructor(
    private _client: Client,
    private _filter: Function,
    private _options?: MessageCollectorOptions | ReactionCollectorOptions | undefined
  ) {
    super();
  }
  
  get client(): Client { return this._client; }
  get filter(): Function { return this._filter; }
  get options(): MessageCollectorOptions | ReactionCollectorOptions | undefined { return this._options; }

  get collected(): Collection<string, Message> | Collection<string, MessageReaction> {
    return this._collected;
  }

}