// Rotas de Login
import { Router } from 'express';
import { loginUser } from '../controllers/authController';

const router = Router();

// Rota de Login (POST /api/auth/login)
router.post('/login', loginUser);

export default router;