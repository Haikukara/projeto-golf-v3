const express = require('express');

const HandicapruleCtrl = require('../controllers/handicaprule-ctrl');

const router = express.Router();

router.post('/handicaprule', HandicapruleCtrl.createHandicaprule);
router.put('/handicaprule/:id', HandicapruleCtrl.updateHandicapirule);
router.delete('/handicaprule/:id', HandicapruleCtrl.deleteHandicaprule);
router.get('/handicaprule/:id', HandicapruleCtrl.getHandicapruleById)
router.get('/handicaprules', HandicapruleCtrl.getHandicaprules);

module.exports = router;