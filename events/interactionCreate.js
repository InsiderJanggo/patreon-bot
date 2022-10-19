module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;

        if (commandName === 'bkl') {
            await interaction.reply(`Welcome to ${interaction.guild.name}.`);
        } else if (commandName === 'welcometier1') {
            const channel = interaction.options.getChannel('channels');
            const target = interaction.options.getUser('user');
            await interaction.reply(`Hi ${target.username}, Welcome to ${channel}`);
        } else if (commandName === 'greet') {
            const target = interaction.options.getUser('user');
            await interaction.reply(`Hello ${target.username}, Welcome to ${interaction.guild.name}.`);
        }
	},
};