import { Request, Response } from 'express';
import Client from '../models/Client';

// Lista todos os clientes
export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar lista de clientes.' });
    }
};

// Busca um cliente pelo ID
export const getClientById = async (req: Request, res: Response) => {
    try {
        const client = await Client.findById(req.params.id);

        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Cliente não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar cliente.' });
    }
};

// Cria um novo cliente
export const createClient = async (req: Request, res: Response) => {
    const { fullName, corporateEmail, phone, cpfCnpj, address } = req.body;

    // Valida se todos os campos obrigatórios foram enviados
    if (!fullName || !corporateEmail || !phone || !cpfCnpj || !address) {
        return res.status(400).json({
            message: 'Campos obrigatórios: nome, e-mail, telefone, CPF/CNPJ e endereço.'
        });
    }

    try {
        // Verifica se já existe um cliente com o mesmo e-mail
        const clientExists = await Client.findOne({ corporateEmail });

        if (clientExists) {
            return res.status(400).json({ message: 'Um cliente com este e-mail já existe.' });
        }

        const newClient = await Client.create(req.body);

        res.status(201).json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o cliente.' });
    }
};

// Atualiza os dados de um cliente pelo ID
export const updateClient = async (req: Request, res: Response) => {
    try {
        // Verifica se o cliente existe antes de atualizar
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }

        // Aplica as alterações e retorna o documento atualizado
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o cliente.' });
    }
};

// Remove um cliente pelo ID
export const deleteClient = async (req: Request, res: Response) => {
    try {
        // Verifica se o cliente existe antes de deletar
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }

        await client.deleteOne();
        res.json({ message: 'Cliente deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o cliente.' });
    }
};