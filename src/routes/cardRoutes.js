import express from 'express';
import {
  activeCard,
  createCard,
  listCard,
  activateCard,
  deleteCard
} from '../controllers/cardController.js';

const router = express.Router();

router.post('/create', createCard);
router.post('/list', listCard);
router.post('/activateCard', activeCard);
router.post('/activate', activateCard);
router.post('/delete', deleteCard);

export default router;