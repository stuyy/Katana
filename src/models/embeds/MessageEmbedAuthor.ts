export class MessageEmbedAuthor {

  private _name: string | undefined;
  private _url: string | undefined;
  private _iconUrl: string | undefined;
  private _proxyIconUrl: string | undefined;

  constructor(
    name?: string,
    url?: string,
    iconUrl?: string,
    proxyIconUrl?: string,
  ) {
    this._name = name;
    this._url = url;
    this._iconUrl = iconUrl;
    this._proxyIconUrl = proxyIconUrl;
  }

  get name(): string | undefined { return this._name; }
  get url(): string | undefined { return this._url; }
  get iconUrl(): string | undefined { return this._iconUrl; }
  get proxyIconUrl(): string | undefined { return this._proxyIconUrl; }
  
  set name(name: string | undefined) { this._name = name; }
  set url(url: string | undefined ) { this._url = url; }
  set iconUrl(iconUrl: string | undefined) { this._iconUrl = iconUrl; }
  set proxyIconUrl(proxyIconUrl: string | undefined) { this._proxyIconUrl = proxyIconUrl; }
}