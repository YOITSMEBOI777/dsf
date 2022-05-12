const {Events} = require("./Validation/EventNames")
// const {} = require("util")
const {promisify} = require("util")
const {glob} = require("glob")
const { Client } = require("discord.js")
const PG = promisify(glob)
const Ascii = require("ascii-table")
module.exports = async ( client ) => {
const table = new Ascii("Events Loaded");

(await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
    const event = require(file)
    if(!Events.includes(event.name) || !event.name){
        const L = file.split("/")
        await table.addRow(`${event.name || "MISSING"}`, `⛔ Events Name is either invalid or missing : ${L[6] + `/` + L[7]}`);
        return;
    }
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args, client)) }
    else {
        client.on(event.name, (...args) => event.execute(...args, client)) 
    }
    await table.addRow(event.name, "👌 SUCESSFULL")
    console.log(table.toString())
})
}