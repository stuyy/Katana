import { Client } from "../mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { Message } from "./models/Message.ts";
import { MessageEmbed } from './models/embeds/Embeds.ts';
import { MessageCollector } from './models/collectors/MessageCollector.ts';
import Collection from './models/Collection.ts';
import { MessageReaction } from './models/MessageReaction.ts';
import User from './models/User.ts';
import { ReactionCollector } from './models/collectors/ReactionCollector.ts';


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
    msg.delete({ timeout: 5000 });
  } else if (message.content === '?react') {
    const reaction = await message.react('😂');
    const filter = (reaction: MessageReaction, user: User) => true;
    const collector = new ReactionCollector(message, filter, { time: 10000 });
    collector.on('collect', (reaction: MessageReaction, user: User) => {
      console.log(reaction.emoji.name);
      console.log(user.username);
    });
    collector.on('end', (collected: any) => {
      console.log(collected);
    })
  } else if (message.content === '?edit') {
    const msg = await message.channel.send(embed);
    console.log(msg);
    setTimeout(async () => {
      console.log('Editing...');
      embed.setTitle('HELLLOOOOOOOOOOOOO');
      await msg.edit(embed); 
    }, 5500);
  } else if (message.content === '?embed') {
    const embed = new MessageEmbed()
      .setDescription('hi');
    message.channel.send(embed);
  } else if(message.content === '?fetch') {
    await message.fetch();
  } else if (message.content === '?pin') {
    await message.pin();
  } else if (message.content === '?unpin') {
    await message.unpin();
  } else if (message.content === '?collect') {
    const filter = (m: Message) => m.user.id === message.user.id;
    const collector = new MessageCollector(message.channel, filter, { time: 2000 });
    collector.on('collect', (m: Message) => {
      console.log(m.content);
    });
    collector.on('end', (m: any) => {
      console.log('ended');
    })
  } else if (message.content === '?await') {
    const filter = (reaction: MessageReaction, user: User) => true;
    const reactions = await message.awaitReactions(filter, { time: 5000 });
    console.log(reactions);
  } else if (message.content === '?awaitmsg') {
    const f = (m: Message) => true;
    const msgs: Collection<string, Message> = await message.channel.awaitMessages(f, { time: 5000 });
    console.log(msgs.size);
  }
});


// deno run --allow-read --allow-net --allow-env --allow-hrtime ./src/index.ts
