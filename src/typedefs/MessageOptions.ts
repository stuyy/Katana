export interface MessageOptions {
  content?: string;
  tts?: boolean;
  embed?: MessageEmbed;
}

export interface MessageEmbed {
  title: string;
  description?: string;
}
