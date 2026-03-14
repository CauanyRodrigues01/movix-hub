import { Router } from 'express';
import { getAllDrivers, createOneDriver, getOneDriver, updateOneDriver, deleteOneDriver } from '../controllers/driverController';
import protect from '../middleware/authMiddleware';

const router = Router();

// All routes below require authentication
router.route('/')
    .get(getAllDrivers)
    .post(createOneDriver);

router.route('/:id')
    .get(getOneDriver)
    .put(updateOneDriver)
    .delete(deleteOneDriver);

export default router;