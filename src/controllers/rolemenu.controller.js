const GuildModel = require(`../models/guild.model`);

const { getRoleById } = require(`../helpers/role.helper`);

module.exports.getRole = async (guildId, channelId, messageId, emoji) => {
    const guild = await GuildModel.findOne({ guildId: guildId });

    // si le serveur n'est pas enregistré dans la base de données
    if (!guild) return null;

    const rolemenu = guild.rolemenus.find(rolemenu => rolemenu.channelId === channelId && rolemenu.messageId === messageId && rolemenu.emoji === emoji);

    // si il n'y a pas de rolemenu associé au salon, message et emoji
    if (!rolemenu) return null;

    const roleId = rolemenu.roleId;
    const role = await getRoleById(guildId, roleId);

    // si le rôle n'existe pas
    if (!role) return null;

    return role;
}

module.exports.addRolemenu = async (guildId, channelId, messageId, emoji, roleId) => {
    const guild = await GuildModel.findOne({ guildId: guildId });

    // si le serveur est enregistré dans la base de données
    if (guild) {
        await GuildModel.updateOne({ guildId: guildId }, { $push: { rolemenus: { channelId: channelId, messageId: messageId, emoji: emoji, roleId: roleId } } });
    } else {
        await GuildModel.create({ guildId: guildId, rolemenus: { channelId: channelId, messageId: messageId, emoji: emoji, roleId: roleId } });
    }
}

module.exports.removeRolemenu = async (guildId, channelId, messageId, emoji, roleId) => {
    const guild = await GuildModel.findOne({ guildId: guildId });

    // si le serveur est enregistré dans la base de données
    if (guild) {
        await GuildModel.updateOne({ guildId: guildId }, { $pull: { rolemenus: { channelId: channelId, messageId: messageId, emoji: emoji, roleId: roleId } } });
    }
}