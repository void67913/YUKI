import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Set your AFK status')
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Why are you AFK?')
        .setRequired(false)
    ),

  async execute(interaction) {
    const reason =
      interaction.options.getString('reason') || 'AFK';

    interaction.client.afkUsers ??= new Map();

    interaction.client.afkUsers.set(interaction.user.id, {
      reason,
      timestamp: Date.now()
    });

    await interaction.reply(
      `💤 **${interaction.user.username}** is now AFK!\n> ${reason}`
    );
  }
};
