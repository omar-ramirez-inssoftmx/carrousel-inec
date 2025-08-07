import express from 'express';
import {
  createCard,
  listCard,
  deleteCard
} from '../controllers/cardController.js';

const router = express.Router();

router.post('/create', createCard);
router.post('/list', listCard);
router.post('/delete', deleteCard);

export default router;