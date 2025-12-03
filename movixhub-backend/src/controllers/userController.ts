// Lógica CRUD de Usuários
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// --- Funções Auxiliares de Permissão (Mock) ---
// Em um sistema real, esta lógica seria mais robusta
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

// --- 1. GET /api/users - Obter Todos os Usuários ---
// @desc    Obter todos os usuários (Equipe Interna)
// @access  Private (Requer Admin/Supervisor)
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

// --- 2. GET /api/users/:id - Obter Usuário por ID ---
// @desc    Obter detalhes de um usuário específico
// @access  Private (Requer Admin/Supervisor ou ser o próprio usuário)
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

// --- 3. POST /api/users - Criar Novo Usuário ---
// @desc    Cria um novo usuário na base (Equipe Interna)
// @access  Private (Requer Admin/Supervisor)
export const createUser = async (req: Request, res: Response) => {
    if (!checkAdminPermissions(req, res)) return;

    const { corporateEmail, passwordHash, fullName, accessProfile, department, position } = req.body;

    // Validação básica
    if (!corporateEmail || !passwordHash || !fullName || !accessProfile) {
        return res.status(400).json({
            message: 'Campos essenciais (e-mail, senha, nome, perfil de acesso) são obrigatórios.'
        });
    }

    try {
        // Verifica se o e-mail já existe
        const userExists = await User.findOne({ corporateEmail });

        if (userExists) {
            return res.status(400).json({ message: 'Um usuário com este e-mail corporativo já existe.' });
        }

        // 1. Cria a instância do documento (não salva ainda)
        const userDoc = new User({
            ...req.body,
            createdBy: req.user?.fullName || 'Sistema Interno',
            // O passwordHash será gerado pelo middleware 'pre-save' no passo 2
        });

        // 2. Salva o documento no banco de dados (chama o middleware 'pre-save')
        const newUser = await userDoc.save();
        // ^^^ newUser é tipado corretamente como um único IUser

        // Retorna o objeto criado (sem a senha)
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName, // <--- FUNCIONA
            corporateEmail: newUser.corporateEmail,
            accessProfile: newUser.accessProfile,
            // ...
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
};

// --- 4. PUT /api/users/:id - Atualizar Usuário ---
// @desc    Atualiza dados de um usuário
// @access  Private (Requer Admin/Supervisor ou ser o próprio usuário)
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

// --- 5. DELETE /api/users/:id - Deletar Usuário ---
// @desc    Deleta um usuário
// @access  Private (Requer Admin/Supervisor)
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