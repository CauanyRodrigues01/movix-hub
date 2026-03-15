import { Request, Response } from 'express';
import FreightService from '../models/FreightService';

// GET /api/freight-services — Lista todos os serviços de frete
export const getAllFreightServices = async (req: Request, res: Response) => {
    try {
        const services = await FreightService.find({});
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar serviços de frete.' });
    }
};

// GET /api/freight-services/:id — Busca um serviço pelo ID
export const getOneFreightService = async (req: Request, res: Response) => {
    try {
        const service = await FreightService.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Serviço de frete não encontrado.' });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar serviço de frete.' });
    }
};

// POST /api/freight-services — Cria um novo serviço de frete
export const createFreightService = async (req: Request, res: Response) => {
    const { name, internalCode, description, averagePrice, coverage, allowedVehicles, averageTime } = req.body;

    // Validação dos campos obrigatórios
    if (!name || !internalCode || !description || averagePrice == null || !coverage?.length || !allowedVehicles?.length || !averageTime) {
        return res.status(400).json({
            message: 'Campos obrigatórios: name, internalCode, description, averagePrice, coverage, allowedVehicles, averageTime.',
        });
    }

    try {
        // Verifica se o código interno já está em uso
        const codeExists = await FreightService.findOne({ internalCode: internalCode.toUpperCase() });
        if (codeExists) {
            return res.status(400).json({ message: `O código interno "${internalCode}" já está em uso.` });
        }

        const newService = await FreightService.create({
            ...req.body,
            createdBy: req.user?.fullName || 'Sistema Interno',
        });

        res.status(201).json(newService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar serviço de frete.' });
    }
};

// PUT /api/freight-services/:id — Atualiza um serviço de frete
export const updateFreightService = async (req: Request, res: Response) => {
    try {
        const service = await FreightService.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Serviço de frete não encontrado.' });
        }

        // Se o internalCode está sendo alterado, verifica duplicidade
        if (req.body.internalCode && req.body.internalCode.toUpperCase() !== service.internalCode) {
            const codeExists = await FreightService.findOne({ internalCode: req.body.internalCode.toUpperCase() });
            if (codeExists) {
                return res.status(400).json({ message: `O código interno "${req.body.internalCode}" já está em uso.` });
            }
        }

        const updatedService = await FreightService.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true } // Retorna o doc atualizado e valida os enums
        );

        res.status(200).json(updatedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar serviço de frete.' });
    }
};

// DELETE /api/freight-services/:id — Remove um serviço de frete
export const deleteFreightService = async (req: Request, res: Response) => {
    try {
        const service = await FreightService.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Serviço de frete não encontrado.' });
        }

        await service.deleteOne();
        res.status(200).json({ message: `Serviço "${service.name}" deletado com sucesso.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar serviço de frete.' });
    }
};
