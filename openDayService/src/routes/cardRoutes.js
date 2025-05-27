const express = require('express');
const router = express.Router();
const { activeCard, createCard, listCard, activateCard, deleteCard } = require('../controllers/cardController');


router.post('/create', createCard);

router.post('/list', listCard);

router.post('/activateCard', activeCard);

router.post('/activate', activateCard);

router.post('/delete', deleteCard);

module.exports = router;