const Player = require('../models/player-model');

createPlayer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Voce tem que especificar um jogador'
        })
    }

    const player = new Player(body)

    if (!player) {
        return res.status(400).json({ success: false, error: err })
    }

    player
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: player._id,
                message: 'Jogador criado!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Jogador não criado!'
            })
        })
}

updatePlayer = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Voce tem que especificar um jogador a ser atualizado!'
        })
    }

    Player.findOne({ _id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(400).json({
                err,
                message: 'Jogador não encontrado!',
            })
        }
        player.name = body.name
        player.nickname = body.nickname 
        player.phone = body.phone 
        player.age = body.age 
        player.handicapAnt = body.handicapAnt 
        player.handicapAtl = body.handicapAtl 
        player.dinheiroAc = body.dinheiroAc
        player
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: player._id,
                    message: 'Jogador atualizado!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Jogador não atualizado!',
                })
            })
    })

}

deletePlayer = async (req, res) => {
    await Player.findOneAndDelete({ _id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!player) {
            return res 
                .status(404)
                .json({  success: false, error: `Jogador não encontrado!` })
        }

        return res.status(200).json({ success: true, data: player })
    }).catch(err => console.log(err))
}

getPlayerById = async (req, res) => {
    await Player.findOne({ _id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!player) {
            return res
                .status(404)
                .json({ success: false, error: `Jogador não encontrado!` })
        }
        return res.status(200).json({ success: true, data: player }) 
    }).catch(err => console.log(err))
}

getPlayers = async (req, res) => {
    await Player.find({}, (err, players) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: `Jogador não encontrado!` })
        }
        return res.status(200).json({ success: true, data: players })
    }).catch(err => console.log(err))
}

module.exports = {
    createPlayer,
    updatePlayer,
    deletePlayer,
    getPlayers,
    getPlayerById,
}