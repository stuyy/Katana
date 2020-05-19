import { Client } from '../src/client/Client.ts';
import "https://deno.land/x/dotenv/load.ts";
import Guild from './models/Guild.ts';

const client = new Client();
client.login(Deno.env.get('BOT_TOKEN')!.toString());

client.on('ready', () => {
  console.log('Bot has logged in.');
  const guild = client.guilds.get('710617016276615258');
  
});
