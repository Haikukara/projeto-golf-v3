const Match = require('../models/match-model');

createMatch = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Voce tem que informar a partida'
        })
    }


    const match = new Match(body)

    console.log('>>>>',match)

    if (!match) {
        return res.status(400).json({ success: false, error: err })
    }

    match  
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: match._id,
                message: 'Partida criada!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Partida não criada!'
            })
        })

}

updateMatch = async (req, res) => {
    const body = req.body 

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Voce precisa informar o que atualizar!'
        })
    }

    Match.findOne({ _id: req.params.id }, (err, match) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Partida não encontrada!',
            })
        }
        match.players = body.players 
        match.day = body.day 
        match.betPrice = body.betPrice
        match.markModified('players')
        match
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: match._id,
                    message: 'Partida atualizada!',
                })    
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Partida não atualizada!',
                })
            })  
    })
}

deleteMatch = async (req, res) => {
    await Match.findOneAndDelete({ _id: req.params.id }, (err, match) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!match) {
            return res.status(404).json({ success:false, error: `Partida não encontrada` })
        }

        return res.status(200).json({ success: true, data: match })
    }).catch(err => console.log(err))

}

getMatchById = async (req, res) => {
    await Match.findOne({ _id: req.params.id }, (err, match) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!match) {
            return res.status(404).json({ success: false, message: 'Partida não encontrada!' })
        }
        return res.status(200).json({ success: true, data: match })
    }).catch(err => console.log(err))
}

getMatches = async (req, res) => {
    await Match.find({}, (err, matches) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!matches.length) {
            return res.status(404).json({ success: false, error: `Partida não encontrada!` })
        }
        return res.status(200).json({ success: true, data: matches })
    }).catch(err => console.log(err))
}

module.exports = {
    createMatch,
    updateMatch,
    deleteMatch,
    getMatches,
    getMatchById
}