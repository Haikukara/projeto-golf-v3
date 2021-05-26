const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Player = new Schema(
    {
        name: { type: String, required: true },
        nickname: { type: String, required: true },
        phone: { type: String, required: false },    
        age: { type: Number, required: false },
        handicapAnt: { type: Number, required: false },
        handicapAtl: { type: Number, required: true },
        dinheiroAc: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('players', Player)
