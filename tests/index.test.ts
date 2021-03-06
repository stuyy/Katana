import { expect, mock, it } from 'https://deno.land/x/expect/mod.ts';
import { Client } from '../mod.ts';
import ClientUser from '../src/client/ClientUser.ts';
import { resolveRoles, resolveEmojis, buildGuildInstance, resolveGuildMembersAndUsers, } from '../src/utils/resolvers.ts';
import Collection from '../src/models/Collection.ts';
import Guild from '../src/models/Guild.ts';
import GuildMember from '../src/models/GuildMember.ts';
import Role from '../src/models/Role.ts';
import User from '../src/models/User.ts';
import { validateEmoji } from '../src/utils/checks.ts';
import Emoji from '../src/models/Emoji.ts';

const {
  guild,
  members
} = JSON.parse(Deno.readTextFileSync('./tests/mocks/test_1.json'));

it('ensure properties read from JSON file are truthy', () => {
  expect(guild).toBeTruthy();
  expect(members).toBeTruthy();
});

it('should instantiate the client and expect all values to be correct', () => {
  const client = new Client();
  const user = new ClientUser('stuy', '0885', true, '123', 768, 'anson@gmail.com', true, 'avatar');
  client.user = user;
  expect(client).toBeTruthy();
  expect(user).toBeTruthy();
  expect(client.user).toBeTruthy();
  expect(client).toHaveProperty('user');
  expect(client).toHaveProperty('socket');
  expect(client).toHaveProperty('rest');
  expect(client.user.username).toEqual('stuy');
  expect(client.user.discriminator).toEqual('0885');
  expect(client.user.verified).toEqual(true);
  expect(client.user.id).toEqual('123');
  expect(client.user.avatar).toEqual('avatar');
  expect(client.user.flags).toEqual(768);
  expect(client.user.email).toEqual('anson@gmail.com');
  expect(client.user.bot).toEqual(true);
});

it('should build client, clientuser, and guild instances', () => {
  const client = new Client();
  const user = new ClientUser('stuy', '0885', true, '123', 768, 'anson@gmail.com', true, 'avatar');
  client.user = user;

  const { roles, emojis } = guild;

  const roleCollection = resolveRoles(client, roles);
  expect(roleCollection).toBeInstanceOf(Collection);
  expect(roleCollection).toBeTruthy();
  expect(roleCollection.size).toEqual(3);

  const emojiCollection = resolveEmojis(client, emojis);
  expect(emojiCollection).toBeInstanceOf(Collection);
  expect(emojiCollection.size).toEqual(0);

  const buildGuildInstanceMock = mock.fn(buildGuildInstance);
  const guildObj: Guild = buildGuildInstanceMock(guild);
  guildObj.roles = roleCollection;
  guildObj.emojis = emojiCollection;
  expect(buildGuildInstanceMock).toHaveBeenCalledWith(guild);
  expect(buildGuildInstanceMock).toHaveBeenCalledTimes(1);
  expect(guildObj).toBeInstanceOf(Guild);
  expect(guildObj.name).toEqual('Automation');
  expect(guildObj.roles).toBeTruthy();
  expect(guildObj.roles.size).toEqual(3);

  for (const [id, role] of guildObj.roles) {
    expect(role.id).toEqual(id);
    expect(role).toBeTruthy();
    expect(role).toBeInstanceOf(Role);
  }

  const membersObj = resolveGuildMembersAndUsers(client, guildObj, members);
  expect(membersObj).toBeInstanceOf(Collection);
  expect(membersObj.size).toEqual(3);
  expect(client.users.size).toEqual(3);
  expect(membersObj.size).toEqual(client.users.size);
  
  for (const [id, member] of membersObj) {
    expect(id).toEqual(member.id);
    expect(member).toBeTruthy();
    expect(member).toBeInstanceOf(GuildMember);
    expect(member.user).toBeInstanceOf(User);
  }
});

it('should test for valid emojis', () => {
  const emoji = ':myemoji:324982332410042324';
  expect(validateEmoji('dasdsdasd')).toBeNull();
  expect(validateEmoji(emoji)).toBeTruthy();
  expect(validateEmoji(emoji)).toBeInstanceOf(Array);
  expect(validateEmoji(emoji)).toEqual(['myemoji', '324982332410042324']);
});

it('should add emoji to client.emojis cache and return truthy', () => {
  const client = new Client();
  const user = new User('123', client, 'hi', '12345', 'dsadasd');
  const emoji = new Emoji('324982332410042324', 'myemoji', new Collection(), user, false, false, false, true);
  client.emojis.set(emoji.id, emoji);
  expect(client.emojis.size).toEqual(1);
  const cachedEmoji = client.emojis.get('324982332410042324');
  expect(cachedEmoji).toBeTruthy();
  expect(cachedEmoji).toBeInstanceOf(Emoji);
});