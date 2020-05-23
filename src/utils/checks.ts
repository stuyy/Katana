import { REGEX } from '../constants/Constants.ts';
import { Client } from '../../mod.ts';
import Emoji from '../models/Emoji.ts';

export function validateEmoji(emoji: string): string | string[] | null {
  const emojiWithColon = new RegExp(REGEX.EMOJI_WITH_COLON);
  if (emojiWithColon.test(emoji)) {
    const groupEmoji = new RegExp(REGEX.GROUP_EMOJI);
    const groups = groupEmoji.exec(emoji);
    return (groups && groups.length) ? groups.slice(1) : null;
  }
  // Check if Emoji only contains only numbers
  const emojiWithId = new RegExp(REGEX.EMOJI_ID_ONLY);
  if (emojiWithId.test(emoji)) return emoji;
  return null;
}

export function checkGuildEmoji(emojiId: string | null, client: Client): Emoji | null {
  if (!emojiId) return null;
  return client.emojis.has(emojiId) ? client.emojis.get(emojiId) : null;
}