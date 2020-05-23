import { Client } from "../mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import Message from "./models/Message.ts";
import { MessageEmbed } from './models/embeds/Embeds.ts';


const client = new Client();
client.login(Deno.env.get("BOT_TOKEN")!.toString());

client.on("ready", () => {
  console.log("Bot has logged in.");
});

const embed = new MessageEmbed()
  .setTitle('adasdd')
  .setDescription('Hello')
  .setColor(3313064)
  .setFooter('hello')
  .addField('Hi', 'Hello');

client.on("message", async (message: Message) => {

  if (message.content === "?hello") {
    const msg = await message.channel.send("hello");
    msg.delete();
  } else if (message.content === '?react') {
    const reaction = await message.react('😂');
    console.log(reaction);
  } else if (message.content === '?edit') {
    const msg = await message.channel.send(embed);
    console.log(msg);
    setTimeout(async () => {
      console.log('Editing...');
      embed.setTitle('HELLLOOOOOOOOOOOOO');
      await msg.edit(embed); 
    }, 5500);
  } else if (message.content === '?embed') {
    
  }
});


// deno run --allow-read --allow-net --allow-env --allow-hrtime ./src/index.ts
