import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Autenticar usuário e obter token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    const { corporateEmail, password } = req.body; 

    // Validação de campos
    if (!corporateEmail || !password) {
        return res.status(400).json({ 
            message: 'E-mail e senha são obrigatórios.' 
        });
    }

    try {
        // Encontrar usuário
        const user = await User.findOne({ corporateEmail });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas: E-mail não encontrado.' });
        }

        // Comparar senha
        // Se 'password' estiver indefinido (erro do Postman), o .matchPassword vai quebrar aqui.
        const isMatch = await user.matchPassword(password);
        
        if (isMatch) {
            // Sucesso: Retorna dados e token
            res.json({
                _id: user._id,
                fullName: user.fullName,
                corporateEmail: user.corporateEmail,
                accessProfile: user.accessProfile,
                status: user.status,
                // Gera o JWT usando o ID do usuário
                token: generateToken(user._id.toString()), 
            });
        } else {
            // Senha incorreta
            res.status(401).json({ message: 'Credenciais inválidas: Senha incorreta.' });
        }
    } catch (error) {
        // Isso registrará o erro real no console do servidor para depuração.
        console.error('ERRO CRÍTICO NO LOGIN:', error); 
        
        // Retorna um erro genérico para o cliente
        res.status(500).json({ message: 'Erro interno do servidor durante o login. Verifique o log no console.' });
    }
};
