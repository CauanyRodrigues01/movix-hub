import { Request, Response } from 'express';
import Driver from '../models/Driver';

// Get all drivers
export const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const allDrivers = await Driver.find({});
        res.status(200).json({allDrivers, message: "Success in fetching the drivers"});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drivers' });
    }
};

// Create a new driver
export const createOneDriver = async (req: Request, res: Response) => {
    try {
        const newDriver = await Driver.create(req.body);
        res.status(201).json({newDriver, message: "Success in creating the driver"});
    } catch (error) {
        res.status(400).json({ message: 'Data entry error when creating driver' });
    }
};

// Get a single driver by ID
export const getOneDriver = async (req: Request, res: Response) => {
    try {
        const oneDriver = await Driver.findById(req.params.id);
        res.status(200).json({oneDriver, message: "Sucess in fetching the driver"});
    } catch (error) {
        res.status(500).json({ message: `Driver ${req.params.id} not found`});
    }
};

// Update driver data
export const updateOneDriver = async (req: Request, res: Response) => {
    try {
        const updateDriver = await Driver.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({message: 'Sucess in updating driver'});
    } catch (error) {
        res.status(500).json({ message: 'Data entry error when updating driver'});
    }
};

// Delete driver
export const deleteOneDriver = async (req: Request, res: Response) => {
    try {
        const deleteDriver = await Driver.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Successfully removed the driver.'});
    } catch (error) {
        res.status(500).json({ message: `Driver ${req.body.id} not found`});
    }
};