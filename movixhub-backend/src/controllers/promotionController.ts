import { Request, Response } from 'express';
import Promotion from '../models/Promotion';

// Create a new promotion
export const createPromotion = async (req: Request, res: Response) => {
    try {
        const newPromotion = await Promotion.create(req.body);
        res.status(201).json(newPromotion);
    } catch (error) {
        console.error('Error creating promotion:', error);
        res.status(400).json({ message: 'Data entry error when creating promotion' });
    }
};

export default createPromotion;
