# What is Katana?

<div style="text-align: center;">

**Katana** is an unofficial Discord library that allows you to build [Discord](http://discord.com) Bots with the [Deno](http://deno.land) runtime.

![build](https://img.shields.io/github/workflow/status/ansonfoong/katana/CI)
![issues](https://img.shields.io/github/issues/ansonfoong/katana)
![pr](https://img.shields.io/github/issues-pr/ansonfoong/katana)
![stars](https://img.shields.io/github/stars/ansonfoong/katana?style=social)
![forks](https://img.shields.io/github/forks/ansonfoong/katana?style=social)

</div>

# Usage

```TS
import { Client } from 'https://deno.land/x/katana/mod.ts'

const client = new Client();

client.on('ready', () => {
  console.log('Bot has logged in!');
});

client.on('message', (message) => {

  if (message.content === 'hello') {
    message.channel.send('Hello World!);
  } else if (message.content === 'embed') {
    message.channel.send({
      embed: { title: 'hello' }
    });
  }
});

client.login('token');
```

# Features

- Caching
- Message Collectors
- Message Embeds
- Supports most Message Endpoints (Create, Delete, Edit, Fetch)
- Very similar to Discord.JS

# In Progress

- Reaction Collectors
- Await Message
- Await Reaction

# Future Features

- Optional In-Memory Caching
- Optional Redis Caching
- Sharding
- Voice Support
- Commands Framework

# Contributing

Contributions are appreciated. You can fork this repository and make a pull request and I'll review it. Feel free to join my Discord server: http://discord.gg/anson


