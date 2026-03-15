// Lógica CRUD de Usuários

import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const checkAdminPermissions = (req: Request, res: Response): boolean => {
    // Apenas Administradores e Supervisores podem gerenciar usuários
    if (req.user?.accessProfile !== 'Administrador' && req.user?.accessProfile !== 'Supervisor') {
        res.status(403).json({
            message: 'Acesso negado. Você não tem permissão para gerenciar usuários.'
        });
        return false;
    }
    return true;
};

export const getUsers = async (req: Request, res: Response) => {
    if (!checkAdminPermissions(req, res)) return;

    try {
        // Encontra todos os usuários, exclui o campo de hash de senha
        const users = await User.find({}).select('-passwordHash');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar lista de usuários.' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    // Permissão: Admin/Supervisor OU o ID na URL é o ID do usuário logado
    const canView =
        req.user?.accessProfile === 'Administrador' ||
        req.user?.accessProfile === 'Supervisor' ||
        req.user?._id.toString() === req.params.id;

    if (!canView) {
        return res.status(403).json({
            message: 'Acesso negado. Você não tem permissão para visualizar este perfil.'
        });
    }

    // Busca o usuário pelo ID
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    if (!checkAdminPermissions(req, res)) return;

    try {
        const userExists = await User.findOne({ corporateEmail: req.body.corporateEmail });
        if (userExists) {
            return res.status(400).json({ message: 'Um usuário com este e-mail já existe.' });
        }

        const userDoc = new User({
            ...req.body,
            createdBy: req.user?.fullName || 'Sistema Interno',
        });

        const newUser = await userDoc.save();

        // Forma atualizada para esconder a senha
        const { passwordHash: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userIdToUpdate = req.params.id;

    // Permissão: Admin/Supervisor OU o ID na URL é o ID do usuário logado
    const canUpdate =
        req.user?.accessProfile === 'Administrador' ||
        req.user?.accessProfile === 'Supervisor' ||
        req.user?._id.toString() === userIdToUpdate;

    if (!canUpdate) {
        return res.status(403).json({
            message: 'Acesso negado. Você só pode atualizar o seu próprio perfil, a menos que seja um administrador.'
        });
    }

    // Busca o usuário e aplica as atualizações
    try {
        const user = await User.findById(userIdToUpdate);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Prepara os dados de atualização
        const updateData = req.body;

        // Se a senha estiver sendo alterada, faz o hash antes de salvar
        if (updateData.passwordHash) {
            const salt = await bcrypt.genSalt(10);
            updateData.passwordHash = await bcrypt.hash(updateData.passwordHash, salt);
        }

        // Aplica as mudanças e salva (incluindo createdAt/updatedAt)
        const updatedUser = await User.findByIdAndUpdate(
            userIdToUpdate,
            { $set: updateData },
            { new: true } // Retorna o documento modificado
        ).select('-passwordHash');

        res.json(updatedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    if (!checkAdminPermissions(req, res)) return;

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Impede que o próprio usuário logado se delete por esta rota
        if (req.user?._id.toString() === req.params.id) {
            return res.status(400).json({ message: 'Você não pode deletar sua própria conta através desta rota.' });
        }

        await user.deleteOne();
        res.json({ message: 'Usuário deletado com sucesso.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o usuário.' });
    }
};