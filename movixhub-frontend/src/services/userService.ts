import api from './api';
import type { User } from '../types';

export const userService = {
    // Busca todos
    getUsers: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data.map((user: any) => ({
            ...user,
            id: user._id, 
        }));
    },


    createUser: async (userData: Partial<User>): Promise<User> => {
        const response = await api.post('/users', userData);
        return { ...response.data, id: response.data._id };
    },

    updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
        const response = await api.put(`/users/${id}`, userData);
        return { ...response.data, id: response.data._id };
    },

    deleteUser: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    }
};