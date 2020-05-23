import {
  MessageEmbedAuthor,
  MessageEmbedField,
  MessageEmbedFooter,
  MessageEmbedImage,
  MessageEmbedProvider,
  MessageEmbedThumbnail,
  MessageEmbedVideo
} from './Embeds.ts';

export class MessageEmbed {

  private title?: string;
  private type?: string;
  private description?: string;
  private url?: string;
  private timestamp?: Date;
  private color?: number;
  private footer?: MessageEmbedFooter;
  private image?: MessageEmbedImage;
  private thumbnail?: MessageEmbedThumbnail;
  private video?: MessageEmbedVideo;
  private provider?: MessageEmbedProvider;
  private author?: MessageEmbedAuthor;
  private fields: Array<MessageEmbedField> = [];

  constructor(
    title?: string,
    type?: string,
    description?: string,
    url?: string,
    timestamp?: Date,
    color?: number,
    footer?: MessageEmbedFooter,
    image?: MessageEmbedImage,
    thumbnail?: MessageEmbedThumbnail,
    video?: MessageEmbedVideo,
    provider?: MessageEmbedProvider,
    author?: MessageEmbedAuthor,
  ) {
    this.title = title;
    this.type = type;
    this.description = description;
    this.url = url;
    this.timestamp = timestamp;
    this.color = color;
    this.footer = footer;
    this.image = image;
    this.thumbnail = thumbnail;
    this.video = video;
    this.provider = provider;
    this.author = author;
  }
  
  getTitle(): string | undefined { return this.title; }
  setTitle(title: string | undefined): MessageEmbed {
    this.title = title;
    return this;
  }

  getType(): string | undefined { return this.type; }
  setType(type: string | undefined): MessageEmbed { 
    this.type = type;
    return this;
  }

  getDescription(): string | undefined { return this.description; }
  setDescription(description: string) { 
    this.description = description;
    return this;
  }

  getUrl(): string | undefined { return this.url; }
  setUrl(url: string | undefined) {
    this.url = url; 
    return this;
  }

  getTimestamp(): Date | undefined { return this.timestamp; }
  setTimestamp(timestamp?: Date | undefined) {
    if (timestamp) this.timestamp = timestamp;
    else this.timestamp = new Date();
    return this;
  }

  getColor(): number | undefined { return this.color; }
  setColor(color: number | undefined) { 
    this.color = color;
    return this;
  }

  getFooter(): MessageEmbedFooter | undefined { return this.footer; }
  setFooter(text?: string, icon?: string, proxyIconUrl?: string) {
    this.footer = new MessageEmbedFooter(text, icon, proxyIconUrl);
    return this;
  }

  getImage(): MessageEmbedImage | undefined { return this.image; }
  setImage(url?: string, proxyUrl?: string, height?: number, width?: number): MessageEmbed {
    this.image = new MessageEmbedImage(url, proxyUrl, height, width);
    return this;
  }

  getThumbnail(): MessageEmbedThumbnail | undefined { return this.thumbnail; }
  setThumbnail(url?: string, proxyUrl?: string, height?: number, width?: number): MessageEmbed {
    this.thumbnail = new MessageEmbedThumbnail(url, proxyUrl, height, width);
    return this;
  }

  getVideo(): MessageEmbedVideo | undefined { return this.video; }
  // setVideo(url?: string, height?: number, width?: number): MessageEmbed {
  //   this.video = new MessageEmbedVideo(url, height, width);
  //   return this;
  // }

  getProvider(): MessageEmbedProvider | undefined { return this.provider; }
  setProvider(name?: string, url?: string): MessageEmbed {
    this.provider = new MessageEmbedProvider(name, url);
    return this;
  }

  getAuthor(): MessageEmbedAuthor | undefined { return this.author; }
  setAuthor(name?: string, url?: string, iconUrl?: string, proxyIconUrl?: string): MessageEmbed {
    this.author = new MessageEmbedAuthor(name, url, iconUrl, proxyIconUrl);
    return this;
  }

  addField(text: string, value: string, inline?: boolean): MessageEmbed {
    this.fields.push(new MessageEmbedField(text,value,inline));
    return this;
  }
}
