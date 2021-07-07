Skip to content
zSpl1nterUS
/
Bot-Tutorial
Source do Bot que faço na minha série de tutorial de bot em JavaScript.

 MIT License
 26 stars  35 forks
Code
Issues
1
Pull requests
Actions
More
Bot-Tutorial/src/commands/Fun/kiss.js /
@zSpl1nterUS
zSpl1nterUS 📦 Aulas 42 e 43
 History
 1 contributor
39 lines (31 sloc)  1.05 KB
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const fetch = require("node-fetch");

module.exports = class Kiss extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "kiss";
    this.category = "Fun";
    this.description = "Comando para beijar outros membros.";
    this.usage = "kiss <user>";
    this.aliases = ["beijar"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) || message.mentions.users.first();

    if (!user)
      return message.channel.send(
        `${message.author}, você deve mencionar quem deseja abraçar primeiro.`
      );

    const body = await fetch("https://nekos.life/api/v2/img/kiss").then((res) =>
      res.json()
    );

    const EMBED = new ClientEmbed(author)
      .setImage(body.url)
      .setDescription(`${message.author} deu um beijo no(a) ${user}`);

    message.channel.send(EMBED);
  }
};
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete