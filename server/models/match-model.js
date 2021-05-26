const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Match = new Schema(
    {
        players_1: { type: [], required: true },
        players_2: { type: [], required: true },
        totalPlayers_1: { type: Number, required: true },
        totalPlayers_2: { type: Number, required: true },
        betPrice: { type: String, required: true },
        first_1: { type: [], required: true },
        second_1: { type: [], required: false },
        third_1: { type: [], required: false },
        first_2: { type: [], required: true },
        second_2: { type: [], required: false },
        third_2: { type: [], required: false },
        day: { type: String, required: true },
        firstPrize_1: { type: Number, required: false },
        secondPrize_1: { type: Number, required: false },
        thirdPrize_1: { type: Number, required: false }, 
        firstPrize_2: { type: Number, required: false },
        secondPrize_2: { type: Number, required: false },
        thirdPrize_2: { type: Number, required: false }, 
    },
    { timestamps: true },
)

module.exports = mongoose.model('matches', Match)
