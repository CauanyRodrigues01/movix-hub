// Rotas CRUD

import { Router } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = Router();

// Todas as rotas abaixo requerem autenticação (protect)
router.route('/')
    .get(protect, getUsers) // GET /api/users
    .post(protect, createUser); // POST /api/users (cria novo usuário)

router.route('/:id')
    .get(protect, getUserById) // GET /api/users/:id
    .put(protect, updateUser)  // PUT /api/users/:id (atualiza)
    .delete(protect, deleteUser); // DELETE /api/users/:id

export default router;