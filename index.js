require("http").createServer((req, res) => res.end("🥭")).listen(process.env.PORT || 8080)
require("dotenv").config();
const { Client, Collection } = require("discord.js");
const UrlsConfig = require("./database/models/UrlsConfig");
const fetchProjects = require("./fetchProjects");
const { timeout, disable_fetching } = require("./config.json");
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
const { GiveawaysManager } = require('discord-giveaways');
const readlineSync = require('readline-sync');
const { MessageEmbed } = require('discord.js')
const DisTube = require("distube")
const Discord = require('discord.js'); //Requiring Discord.js module.
const DiscordButtons = require('discord-buttons'); //Requiring Discord-BUttons module.
const button = require('discord-buttons');
const disbut = require("discord-buttons")
const { hangman } = require('reconlx')
const disbutpages = require("discord-buttons-pages")
const ButtonPages = require('discord-button-pages'); //Requiring Discord-Button-Pages module.
const Nuggies = require('nuggies');
Nuggies.connect(process.env.MONGO_URI);
const client = new Client({
  disableEveryone: true,
});
disbut(client);
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
(async () => {
  await require("./database/connect")();

  let pros = await UrlsConfig.find();

  client.commands = new Collection();
  client.aliases = new Collection();
  client.projectsSize = 0;
  client.projects = pros.map((p) => p.projectURL);
  UrlsConfig.countDocuments({}, async (err, total) => {
    client.projectsSize = total;

    ["command", "events"].forEach((handler) => {
      require(`./handlers/${handler}`)(client);
    });

    await client.login(process.env.BOT_TOKEN);

    if (!disable_fetching) fetchProjects(client.projects, client);
  });
})();
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});

//create buttons
let firstbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟙")
  .setStyle("blurple")
  .setID("firstbutton")
let secondbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟚")
  .setStyle("blurple")
  .setID("secondbutton")
let thirdbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟛")
  .setStyle("blurple")
  .setID("thirdbutton")
let row1 = new disbut.MessageActionRow()
  .addComponent(firstbutton)
  .addComponent(secondbutton)
  .addComponent(thirdbutton)
const step1 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:857122481088495629:873454677231034368> Get the link", "Our first step is to get the webpage link. You can find the code in the bottom or side of you repl.it(see screenshot below)! If you do not have this link, copy paste this code at the top of your `index.js` and run it again.\n ```https://pastebin.com/HJGhAUZf```"
  )
  .setImage("https://media.discordapp.net/attachments/870077234780725281/873324807444365413/Screen_Shot_2021-08-06_at_2.57.52_PM.png?width=1017&height=534")
const step3 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:5286_three_emj_png:873453086981636127> Other Commands", "Now that we have added your project, you can use other command such as `projects` `remove` `stats` and `total`. Below Is an image of the remove command!  "
  )
  .setImage("https://cdn.discordapp.com/attachments/875796343338172447/875976584715182100/Screen_Shot_2021-08-13_at_10.37.50_PM.png")
const step2 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:4751_two_emj_png:873364919259627551> Run the command", "Our next step is to runn the command. The syntax of this command is `*add <repl_url>`. If done correcty the bot should give embed saying: ```:white_check_mark: Added Succesfully!``` See Screenshot Below For More details."
  )
  .setImage("https://media.discordapp.net/attachments/870077234780725281/873366580522782820/Screen_Shot_2021-08-06_at_5.46.41_PM.png");
const punch1 = new MessageEmbed()
  .setTitle("test1 punch")
const kick1 = new MessageEmbed()
  .setTitle("test2 kick")
const shield1 = new MessageEmbed()
  .setTitle("test3 shield/block")
let kick = new disbut.MessageButton()
  .setLabel("Kick")
  .setStyle("blurple")
  .setID("kick")
  .setEmoji("🦵")
let punch = new disbut.MessageButton()
  .setLabel("Punch")
  .setStyle("green")
  .setID("punch")
  .setEmoji("🤜")
let block = new disbut.MessageButton()
  .setLabel("Block")
  .setStyle("red")
  .setID("block")
  .setEmoji("🛡️")
let row2 = new disbut.MessageActionRow()
  .addComponent(punch)
  .addComponent(block)
  .addComponent(kick)

// Button Handler
client.on("clickButton", async (button) => {
  if (button.id === "firstbutton") {
    button.message.edit({
      embed: step1,
      component: row1,
    });
  } else if (button.id === "secondbutton") {

    button.message.edit({
      embed: step2,
      component: row1,
    });
  } else if (button.id === "thirdbutton") {
    button.message.edit({
      embed: step3,
      component: row1,
    });

  } else if (button.id === "punch") {
    button.message.edit({
      embed: punch1,
      component: row2,
    });
  } else if (button.id === "kick") {
    button.message.edit({
      embed: kick1,
      component: row2,
    });
  } else if (button.id === "block") {
    button.message.edit({
      embed: shield1,
      component: row2,
    });
  }
})
// pinging
setInterval(async () => {
  UrlsConfig.countDocuments({}, (err, total) => {
    client.projectsSize = total;
    client.user.setActivity(`${total} Project(s)`, {
      type: "WATCHING",
    });
  });



  if (!disable_fetching) fetchProjects(client.projects, client);
}, timeout);

