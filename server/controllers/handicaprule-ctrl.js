const Handicaprule = require('../models/handicaprule-model');

createHandicaprule = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Voce tem que especificar um valor para a regra'
        })
    }

    const handicaprule = new Handicaprule(body)
    
    if (!handicaprule) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    handicaprule
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: handicaprule._id,
                message: 'Regra criada com sucesso!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Regra não criada!'
            })
        })
}

updateHandicapirule = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Voce tem que especificar um valor para a regra'
        })
    }

    Handicaprule.findOne({ _id: req.params.id }, (err, handicaprule) => {
        if (err) {
            return res.status(400).json({
                err,
                message: 'Regra não encontrada!'
            })
        }
        handicaprule.rule = body.rule
        handicaprule
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: handicaprule._id,
                    message: 'Regra atualizada!'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Regra não atualizada!'
                })
            })
    })
}

deleteHandicaprule = async (req, res) => {
    await Handicaprule.findOneAndDelete({ _id: req.params.id }, (err, handicaprule) => {
        if (err) {
            return res.status(400).json({
                success: false,
                erro: err
            })
        }

        if (!handicaprule) {
            return res.status(404).json({
                success: false, error: 'Regra não encontrada!'
            })
        }

        return res.status(200).json({
            success: true,
            data: handicaprule
        })
    }).catch(err => console.log(err))
}

getHandicapruleById = async (req, res) => {
    await Handicaprule.findOne({ _id: req.params.id }, (err, handicaprule) => {
        if (err) {
            return res.status(400).json({ success: false, erro: err })
        }

        if (!handicaprule) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Regra não encontrada!' })
        }
        return res.status(200).json({ success: true, data: handicaprule })
    }).catch(err => console.log(err))
}

getHandicaprules = async (req, res) => {
    await Handicaprule.find({}, (err, rules) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!rules.length) {
            return res.status(404).json({ success: false, error: 'Regra não encontrada!' })
        }
        return res.status(200).json({ success: true, data: rules })
    }).catch(err => console.log(err))
}

module.exports = {
    createHandicaprule,
    updateHandicapirule,
    deleteHandicaprule,
    getHandicaprules,
    getHandicapruleById,
}