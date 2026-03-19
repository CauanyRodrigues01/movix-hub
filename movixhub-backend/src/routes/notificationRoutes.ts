import express from 'express';
import {
    getNotificationsByUser,
    createNotification,
    markAsRead,
    deleteNotification,
} from '../controllers/notificationController';

const router = express.Router();

// Obtém notificações de um usuário
router.get('/user/:userId', getNotificationsByUser);

// Cria notificação
router.post('/', createNotification);

// Marca como lida
router.patch('/:id/read', markAsRead);

// Deleta
router.delete('/:id', deleteNotification);

export default router;
