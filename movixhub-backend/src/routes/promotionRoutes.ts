import { Router } from 'express';
import { createPromotion } from '../controllers/promotionController';
import protect from '../middleware/authMiddleware';

const router = Router();

// Apenas criação por enquanto (protegida)
router.route('/')
    .post(protect, createPromotion);

export default router;
