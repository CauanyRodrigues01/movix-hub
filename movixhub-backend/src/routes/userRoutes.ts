// Rotas CRUD de usuário

import { Router } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = Router();

// Todas as rotas abaixo requerem autenticação (protect)
router.route('/')
    .get(protect, getUsers)
    .post(protect, createUser);

router.route('/:id')
    .get(protect, getUserById)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

export default router;