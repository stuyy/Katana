import { Client } from '../src/client/Client.ts';
import "https://deno.land/x/dotenv/load.ts";

const client = new Client();
client.login(Deno.env.get('BOT_TOKEN')!.toString());

client.on('ready', () => {
  console.log('Bot has logged in.');
});
