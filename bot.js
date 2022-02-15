const tmi = require('tmi.js');

// connect to twitch irc
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'straydavi',
    password: 'oauth:fuckyou'
  },
  channels: ['koriome']
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
  if (msg.inclues('swag')) {
    client.say(target `has said the word. your time has come. @koriome`);
    console.log(`* THE WORD HATH BEEN SAID = ${commandName}`);
  } else {
    console.log(`* NO WORD = ${commandName}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
