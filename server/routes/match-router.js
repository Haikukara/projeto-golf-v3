const express = require('express');

const MatchCtrl =  require('../controllers/match-ctrl');

const router = express.Router();

router.post('/match', MatchCtrl.createMatch);
router.put('/match/:id', MatchCtrl.updateMatch);
router.delete('/match/:id', MatchCtrl.deleteMatch);
router.get('/match/:id', MatchCtrl.getMatchById);
router.get('/matches', MatchCtrl.getMatches);

module.exports = router;