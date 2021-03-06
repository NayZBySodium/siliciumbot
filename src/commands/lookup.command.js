const moment = require(`moment`);

module.exports = {
    name: `lookup`,
    description: `Permet de rΓ©cupΓ©rer les informations d'un membre`,
    options: [
        {
            name: `membre`,
            type: `USER`,
            description: `Membre`,
            required: true
        }
    ],
    run: async (Discord, client, interaction, sender, guild) => {
        if (!sender.permissions.has(`MANAGE_MESSAGES`)) {
            return interaction.reply(`β **| \`Vous n'avez pas la permissions d'effectuer cette action !\`**`);
        }

        const member = interaction.options.getMember(`membre`);

        const createdAt = moment(member.user.createdAt).format(`L`);
        const id = member.user.id;
        const tag = member.user.tag;
        const joinedAt = moment(member.joinedAt).format(`L`);
        const mutedAt = moment(member.communicationDisabledUntil).format(`L`);
        const premiumSince = moment(member.premiumSince).format(`L`);
        const voiceChannel = member.voice.channel;

        const embed = new Discord.MessageEmbed()
            .setTitle(`π **β’ Lookup de \`${tag}\`:**`)
            .setDescription(`Informations concernant ${member}.`)
            .addField(`π **β’ __ID de compte:__**`, `\`${id}\``, true)
            .addField(`π€ **β’ __Nom d'utilisateur:__**`, `\`${tag}\``, true)
            .addField(`π **β’ __En vocal:__**`, `${(voiceChannel ? voiceChannel : `Non β`)}`, true)
            .addField(`π **β’ __Compte crΓ©er le:__**`, `\`${createdAt}\``, true)
            .addField(`π‘ **β’ __Rejoint le:__**`, `\`${joinedAt}\``, true)
            .addField(`π **β’ __Est muet depuis:__**`, `\`${mutedAt == `Invalide date` ? mutedAt : `Non β`}\``, true)
            .addField(`π° **β’ __Est premium depuis:__**`, `\`${premiumSince == `Invalide date` ? premiumSince : `Non β`}\``, true)
            .setFooter(`β€οΈ ${client.user.tag} β’ 2022 β’ NayZ#5847 π¦Ί`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor(`#4493FF`);

        interaction.reply({ embeds: [embed] });
    }
}