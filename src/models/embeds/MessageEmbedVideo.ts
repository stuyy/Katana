export class MessageEmbedVideo {

  private url: string | undefined;
  private height: number | undefined;
  private width: number | undefined;

  constructor(
    url?: string,
    height?: number,
    width?: number
  ) {
    this.url = url;
    this.height = height;
    this.width = width;
  }

  getUrl(): string | undefined { return this.url; }
  getHeight(): number | undefined { return this.height; }
  getWidth(): number | undefined { return this.width; }
  
  setUrl(url: string | undefined ) { this.url = url; }
  setHeight(height: number | undefined){ this.height = height; }
  setWidth(width: number | undefined) { this.width = width; }
}