import api from './api';
import type { FreightService } from '../types/freight.types';

// Tipo para criar/atualizar — exclui campos gerados pelo servidor
export type FreightServicePayload = Omit<FreightService, 'id' | 'createdAt' | 'updatedAt' | 'changeHistory' | 'createdBy'>;

export const freightServiceAPI = {

    // GET /api/freight-services
    getAll: async (): Promise<FreightService[]> => {
        const response = await api.get<FreightService[]>('/freight-services');
        return response.data;
    },

    // GET /api/freight-services/:id
    getById: async (id: string): Promise<FreightService> => {
        const response = await api.get<FreightService>(`/freight-services/${id}`);
        return response.data;
    },

    // POST /api/freight-services
    create: async (data: FreightServicePayload): Promise<FreightService> => {
        const response = await api.post<FreightService>('/freight-services', data);
        return response.data;
    },

    // PUT /api/freight-services/:id
    update: async (id: string, data: Partial<FreightServicePayload>): Promise<FreightService> => {
        const response = await api.put<FreightService>(`/freight-services/${id}`, data);
        return response.data;
    },

    // DELETE /api/freight-services/:id
    remove: async (id: string): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/freight-services/${id}`);
        return response.data;
    },
};
