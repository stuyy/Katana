import { expect, mock, it } from 'https://deno.land/x/expect/mod.ts';
import Client from '../src/client/Client.ts';
import { buildGuildInstance, resolveRoles, resolveEmojis, buildTextChannel } from '../src/utils/resolvers.ts';
import Guild from '../src/models/Guild.ts';
import { TextChannel } from '../src/models/channels/TextChannel.ts';
import { MessageCollector } from '../src/models/collectors/MessageCollector.ts';
import { Message } from '../src/models/Message.ts';
import { BaseCollector } from '../src/models/collectors/BaseCollector.ts';
const {
  guild,
  members
} = JSON.parse(Deno.readTextFileSync('./tests/mocks/test_1.json'));

const channelData = JSON.parse(Deno.readTextFileSync('./tests/mocks/channel.json'));

Deno.test('expect all files to return truthy values when parsed', () => {
  expect(guild).toBeTruthy();
  expect(members).toBeTruthy();
  expect(channelData).toBeTruthy();
});

Deno.test('it should create an instance of collector', async () => {
  const client = new Client();
  const { roles, emojis } = guild;
  const roleCollection = resolveRoles(client, roles);
  const emojiCollection = resolveEmojis(client, emojis);
  const buildGuildInstanceMock = mock.fn(buildGuildInstance);
  const guildObj: Guild = buildGuildInstanceMock(roleCollection, emojiCollection, guild);
  expect(buildGuildInstanceMock).toHaveBeenCalledTimes(1);
  const channel = buildTextChannel(client, guild, channelData);
  expect(channel).toBeInstanceOf(TextChannel);
  expect(channel.guild.id).toEqual('713468011494899775');
  const filter = (m: Message) => true;
  const collector = new MessageCollector(channel, filter);
  expect(collector).toBeInstanceOf(BaseCollector);
});