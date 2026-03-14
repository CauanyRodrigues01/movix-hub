import { Router } from 'express';
import { createPromotion, getAllPromotions, getPromotionById } from '../controllers/promotionController';
import protect from '../middleware/authMiddleware';

const router = Router();

// Listar e criar promotions (protegidas)
router.route('/')
    .get(protect, getAllPromotions)
    .post(protect, createPromotion);

router.route('/:id')
    .get(protect, getPromotionById);

export default router;
