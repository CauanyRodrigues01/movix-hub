import { Router } from 'express';
import { getAllDrivers, createOneDriver, getOneDriver, updateOneDriver, deleteOneDriver } from '../controllers/driverController';
import protect from '../middleware/authMiddleware';

const router = Router();

// All routes below require authentication
router.route('/')
    .get(protect,getAllDrivers)
    .post(protect,createOneDriver);

router.route('/:id')
    .get(protect,getOneDriver)
    .put(protect,updateOneDriver)
    .delete(protect,deleteOneDriver);

export default router;