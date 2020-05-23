export class MessageEmbedThumbnail {

  private url: string | undefined;
  private proxy_url: string | undefined;
  private height: number | undefined;
  private width: number | undefined;

  constructor(
    url?: string,
    proxyUrl?: string,
    height?: number,
    width?: number
  ) {
    this.url = url;
    this.proxy_url = proxyUrl;
    this.height = height;
    this.width = width;
  }

  getUrl(): string | undefined { return this.url; }
  getProxyUrl(): string | undefined { return this.proxy_url; }
  getHeight(): number | undefined { return this.height; }
  getWidth(): number | undefined { return this.width; }
  
  setUrl(url: string | undefined ) { this.url = url; }
  setProxyUrl(proxyUrl: string | undefined) { this.proxy_url = proxyUrl; }
  setHeight(height: number | undefined){ this.height = height; }
  setWidth(width: number | undefined) { this.width = width; }
}