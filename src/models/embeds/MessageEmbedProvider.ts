export class MessageEmbedProvider {

  private _name: string | undefined;
  private _url: string | undefined;

  constructor(
    name?: string,
    url?: string
  ) {
    this._name = name;
    this._url = url;
  }

  get name(): string | undefined { return this._name; }
  get url(): string | undefined { return this._url; }

  set name(name: string | undefined) { this._name = name; }
  set url(url: string | undefined) { this._url = url; }
}