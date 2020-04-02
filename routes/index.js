const express = require('express');
const router = express.Router();
const football = require('../controller/index.controller')

router.get('/', (req, res) => res.json({ status: "API it's working", message: "Happy coding!" }));

router.get('/leaguestanding', football.getData);
router.post('/recordgame', football.recordGame);
router.get('/listClub', football.listClub);
router.get('/rank', football.getRank);

module.exports = router;