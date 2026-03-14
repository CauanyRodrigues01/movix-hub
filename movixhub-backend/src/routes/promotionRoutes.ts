import { Router } from 'express';
import { createPromotion, getAllPromotions, getPromotionById, deletePromotionById, updatePromotionById } from '../controllers/promotionController';
import protect from '../middleware/authMiddleware';

const router = Router();

router.route('/')
    .get(protect, getAllPromotions)
    .post(protect, createPromotion);

router.route('/:id')
    .get(protect, getPromotionById)
    .patch(protect, updatePromotionById)
    .delete(protect, deletePromotionById);

export default router;
