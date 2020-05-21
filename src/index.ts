import { Client } from '../mod.ts';
import "https://deno.land/x/dotenv/load.ts";
import Guild from './models/Guild.ts';
import Message from './models/Message.ts';
import { TextChannel } from './models/channels/TextChannel.ts';

const client = new Client();
client.login(Deno.env.get('BOT_TOKEN')!.toString());

client.on('ready', () => {
  console.log('Bot has logged in.');
  const guild: Guild = client.guilds.get('533070839806165023');
  const members = guild.members;
});

client.on('guildCreate', (guild: Guild) => {
  console.log(guild.name);
});

client.on('message', (message: Message) => {
  if (message.content === '?hello') {
    message.channel.send({
      content: 'Hello!',
      tts: false,
    });
  } else if (message.content === '?help') {
    message.channel.send({
      content: 'help command'
    })
  }
});

client.on('debug', (data: any) => {
  console.log(data);
});

// deno run --allow-read --allow-net --allow-env --allow-hrtime ./src/index.ts