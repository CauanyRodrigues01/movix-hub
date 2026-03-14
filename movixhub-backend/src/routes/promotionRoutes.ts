import { Router } from 'express';
import { createPromotion, getAllPromotions } from '../controllers/promotionController';
import protect from '../middleware/authMiddleware';

const router = Router();

// Listar e criar promotions (protegidas)
router.route('/')
    .get(protect, getAllPromotions)
    .post(protect, createPromotion);

export default router;
