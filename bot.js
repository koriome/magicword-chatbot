const tmi = require('tmi.js');
require('dotenv').config();

// connect to twitch irc
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.BOT_NICK,
    password: process.env.TMI_TOKEN
  },
  channels: [process.env.CHANNEL]
});

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot


  // If the command is known, let's execute it
  if (msg.includes(process.env.WORD)) {
    client.say(target, `someone has said the word. your time has come. @koriome`);
    console.log(`* THE WORD HATH BEEN SAID = ${msg}`);
  } else {
    console.log(`* NO WORD = ${msg}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
