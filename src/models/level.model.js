const mongoose = require(`mongoose`);

const levelSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        guildId: {
            type: String,
            required: true
        },
        xp: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 0
        }
    }
);

const LevelModel = mongoose.model(`Level`, levelSchema);

module.exports = LevelModel;