const {Client} = require("discord.js")

const client = new Client({ intents: 3 });
const {Token} = require("./config.json")
require("./handlers/Events")

client.login(Token)
