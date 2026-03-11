import { Request, Response } from 'express';
import Driver from '../models/Driver';

// Get all drivers
export const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await Driver.find({});
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drivers' });
    }
};

// Create a new driver
export const createOneDriver = async (req: Request, res: Response) => {
    try {
        const newDriver = await Driver.create(req.body);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ message: 'Data entry error when creating driver' });
    }
};

// Get a single driver by ID
export const getOneDriver = async (req: Request, res: Response) => {

};

// Update driver data
export const updateOneDriver = async (req: Request, res: Response) => {

};

// Delete driver
export const deleteOneDriver = async (req: Request, res: Response) => {

};