# What is Katana?

**Katana** is an unofficial Discord library that allows you to build [Discord](http://discord.com) Bots with the [Deno](http://deno.land) runtime.

# Usage

```TS
import { Client } from 'https://deno.land/x/katana/mod.ts'

const client = new Client();

client.on('ready', () => {
  console.log('Bot has logged in!');
});

client.on('message', (message) => {

  if (message.content === 'hello') {
    message.channel.send({
      content: 'hello'
    });
  }
});

client.login('token');
```

# Features

# Contributing

All contribution is appreciated. You can contribute to this repo by forking and starring, and submitting any Pull Requests.


