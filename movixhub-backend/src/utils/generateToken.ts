import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// A função gera e assina um novo token JWT
export const generateToken = (id: string | Types.ObjectId): string => {
    
    const idString = id.toString(); 

    // Definimos a secret em uma constante para garantir a tipagem
    // Se o .env não existir, o fallback assume o controle
    const secret = (process.env.JWT_SECRET) as string;

    const token = jwt.sign({ id: idString }, secret, {
        expiresIn: '30d',
    });

    return token;
};

export default generateToken;