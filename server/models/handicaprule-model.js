const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Handicaprule = new Schema(
    {
        rule: { type: Number, unique: true, required: true, dropDups: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('handicaprules', Handicaprule)
