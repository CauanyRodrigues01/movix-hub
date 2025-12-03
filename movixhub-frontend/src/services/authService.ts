import api from './api';

export interface LoginCredentials {
    corporateEmail: string;
    password: string;
}

export interface LoginResponse {
    _id: string;
    fullName: string;
    corporateEmail: string;
    accessProfile: string;
    status: string;
    token: string;
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },
};