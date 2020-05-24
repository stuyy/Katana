import { expect, mock, it } from 'https://deno.land/x/expect/mod.ts';
import { buildUser } from '../src/utils/resolvers.ts';
import Client from '../src/client/Client.ts';
import User from '../src/models/User.ts';

const users = JSON.parse(Deno.readTextFileSync('./tests/mocks/users.json'));

it('should expect users to be truthy and have only 1 element', (): void => {
  expect(users).toBeTruthy();
  expect(users).toBeInstanceOf(Array);
  expect(users.length).toEqual(1);
});

it('should create a User instance', (): void => {
  const client = new Client();
  const user = buildUser(client, users[0]);
  expect(user).toBeInstanceOf(User);
  expect(user.id).toEqual('2343243242346346');
  expect(user.username).toEqual('Stuy');
  expect(user.avatar).toEqual('somerandomhash');
  expect(user.discriminator).toEqual('0885');
  expect(user.publicFlags).toEqual(768);
  expect(user.flags).toBeUndefined();
  expect(user.mfaEnabled).toBeUndefined();
  expect(user.bot).toBeUndefined();
  expect(user.premiumType).toBeUndefined();
  expect(user.system).toBeUndefined();
  expect(user.locale).toBeUndefined();
});