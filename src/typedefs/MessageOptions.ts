import { MessageEmbed } from '../models/embeds/Embeds.ts';

export interface MessageOptions {
  content?: string;
  tts?: boolean;
  embed?: MessageEmbed;
}

export interface MessageDeleteOptions {
  timeout?: number;
  reason?: string;
}