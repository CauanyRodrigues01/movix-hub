import { Request, Response } from 'express';
import Notification from '../models/Notification';

// Retorna as notificações de um usuário (por userId)
export const getNotificationsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar notificações.' });
    }
};

// Cria uma nova notificação
export const createNotification = async (req: Request, res: Response) => {
    const { user, title, message, data } = req.body;

    if (!user || !title || !message) {
        return res.status(400).json({ message: 'Campos obrigatórios: user, title, message.' });
    }

    try {
        const newNotification = await Notification.create({ user, title, message, data });
        res.status(201).json(newNotification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar notificação.' });
    }
};

// Marca uma notificação como lida
export const markAsRead = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findById(id);
        if (!notification) return res.status(404).json({ message: 'Notificação não encontrada.' });

        notification.read = true;
        await notification.save();

        res.json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar notificação.' });
    }
};

// Deleta uma notificação
export const deleteNotification = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findById(id);
        if (!notification) return res.status(404).json({ message: 'Notificação não encontrada.' });

        await notification.deleteOne();
        res.json({ message: 'Notificação deletada.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar notificação.' });
    }
};
