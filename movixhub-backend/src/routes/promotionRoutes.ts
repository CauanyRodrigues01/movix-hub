import { Router } from 'express';
import { createPromotion, getAllPromotions, getPromotionById, deletePromotionById } from '../controllers/promotionController';
import protect from '../middleware/authMiddleware';

const router = Router();

router.route('/')
    .get(protect, getAllPromotions)
    .post(protect, createPromotion);

router.route('/:id')
    .get(protect, getPromotionById);

router.route('/:id')
    .delete(protect, deletePromotionById);

export default router;
