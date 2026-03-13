import { Router } from 'express';
import {
    getAllFreightServices,
    getOneFreightService,
    createFreightService,
    updateFreightService,
    deleteFreightService,
} from '../controllers/freightServiceController';
import protect from '../middleware/authMiddleware';

const router = Router();

// Todas as rotas requerem autenticação JWT
router.route('/')
    .get(protect, getAllFreightServices)
    .post(protect, createFreightService);

router.route('/:id')
    .get(protect, getOneFreightService)
    .put(protect, updateFreightService)
    .delete(protect, deleteFreightService);

export default router;
