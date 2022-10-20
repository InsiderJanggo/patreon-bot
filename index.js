require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, REST, SlashCommandBuilder, Routes, PermissionFlagsBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const commands = [
	new SlashCommandBuilder()
	.setName('bkl')
	.setDescription('Say Welcome')
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers), 
	new SlashCommandBuilder()
	.setName('welcometier1')
	.setDescription('Greeting to tier 1')
	.addUserOption((option) => option.setName('user').setDescription('Choose the user to tag'))
	.addChannelOption((option) => option.setName('channels').setDescription('Which channels to send'))
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers),
	new SlashCommandBuilder().setName('greet')
	.setDescription('Greet The User')
	.addUserOption((option) => option.setName('user').setDescription('User'))
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
]

const newCommands = commands.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: newCommands })
	.then(data => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

client.login(BOT_TOKEN);