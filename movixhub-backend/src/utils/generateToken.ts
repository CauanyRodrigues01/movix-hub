import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// A função gera e assina um novo token JWT
// Recebe o ID do usuário (que pode ser um ObjectId do Mongoose)
export const generateToken = (id: string | Types.ObjectId): string => {
    
    // Converte o ID para string para ser usado no Payload do JWT
    const idString = id.toString(); 

    // O token é assinado com o JWT_SECRET do .env
    const token = jwt.sign({ id: idString }, process.env.JWT_SECRET as string, {
        expiresIn: '30d', // O token expira em 30 dias (segurança)
    });

    return token;
};

export default generateToken;