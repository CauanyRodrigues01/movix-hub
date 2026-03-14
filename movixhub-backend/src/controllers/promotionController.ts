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

// Get all promotions
export const getAllPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await Promotion.find({});
        res.status(200).json(promotions);
    } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ message: 'Error fetching promotions' });
    }
};

// Get a single promotion by ID
export const getPromotionById = async (req: Request, res: Response) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.status(200).json(promotion);
    } catch (error) {
        console.error('Error fetching promotion by id:', error);
        res.status(500).json({ message: 'Error fetching promotion' });
    }
};

// Delete promotion by ID
export const deletePromotionById = async (req: Request, res: Response) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        await promotion.deleteOne();
        res.status(200).json({ message: 'Promotion deleted successfully' });
    } catch (error) {
        console.error('Error deleting promotion:', error);
        res.status(500).json({ message: 'Error deleting promotion' });
    }
};

export default createPromotion;
