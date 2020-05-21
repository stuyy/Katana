import { Client } from "../mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import Guild from "./models/Guild.ts";
import Message from "./models/Message.ts";

const client = new Client();
client.login(Deno.env.get("BOT_TOKEN")!.toString());

client.on("ready", () => {
  console.log("Bot has logged in.");
});

client.on("message", (message: Message) => {
  if (message.content === "?hello") {
    message.channel.send("hello");
  } else if (message.content === "?embed") {
    message.channel.send({
      content: "Hello",
      embed: {
        title: "Hi",
        description: "Yoooo",
      },
    });
  } else if (message.content.toLowerCase() === 'helloworld') {
    console.log('hello');
    message.channel.send({
      embed: {
        title: 'This is an embed',
        description: 'This is an embed',
      }
    });
  }
});

client.on("debug", (data: any) => {
  console.log(data);
});

// deno run --allow-read --allow-net --allow-env --allow-hrtime ./src/index.ts
