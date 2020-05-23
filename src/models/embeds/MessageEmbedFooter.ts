export class MessageEmbedFooter {

  private text: string | undefined;
  private icon_url: string | undefined;
  private proxy_icon_url: string | undefined;
  constructor(
    text?: string,
    iconUrl?: string,
    proxyIconUrl?: string
  ) {
    this.text = text;
    this.icon_url = iconUrl;
    this.proxy_icon_url = proxyIconUrl;
  }

  getText(): string | undefined { return this.text; }
  getIconUrl(): string | undefined { return this.icon_url; }
  getProxyIconUrl(): string | undefined { return this.proxy_icon_url; }

  setText(text: string | undefined) { this.text = text; }
  setIconUrl(iconUrl: string | undefined) { this.icon_url = iconUrl; }
  setProxyIconUrl(proxyIconUrl: string | undefined) { this.proxy_icon_url = proxyIconUrl; }
}