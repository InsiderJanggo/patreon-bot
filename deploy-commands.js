//for registering the command to discord slash
require('dotenv').config()
const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);