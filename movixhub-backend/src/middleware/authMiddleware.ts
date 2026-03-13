// Middleware de Autenticação JWT

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Extende o objeto Request do Express para incluir o usuário autenticado
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obter token da header
            token = req.headers.authorization.split(' ')[1];

            // Verificar token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

            // Obter usuário pelo ID do token (excluindo a senha)
            const user = await User.findById(decoded.id).select('-passwordHash');

            if (!user) {
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }

            req.user = user; // Anexar o usuário à requisição
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Não autorizado, token inválido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Não autorizado, nenhum token' });
    }
};

export default protect;