const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'startgame') {
    startGame(message);
  }
});

function startGame(message) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  message.channel.send("I've picked a number between 1 and 100. Try to guess it!");

  const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });

  collector.on('collect', message => {
    const guess = parseInt(message.content);

    if (isNaN(guess)) {
      message.channel.send("That's not a valid number. Please enter a number between 1 and 100.");
      return;
    }

    attempts++;

    if (guess === randomNumber) {
      message.channel.send(`Congratulations! You guessed the number ${randomNumber} correctly in ${attempts} attempts.`);
      collector.stop();
    } else if (guess < randomNumber) {
      message.channel.send("Too low! Try a higher number.");
    } else {
      message.channel.send("Too high! Try a lower number.");
    }
  });

  collector.on('end', (collected, reason) => {
    if (reason === 'time') {
      message.channel.send("Sorry, time's up! You didn't guess the number in time.");
    }
  });
}

client.login('YOUR_DISCORD_BOT_TOKEN');
