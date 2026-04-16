import api from './api';
import type { DriverService } from '../types/driver.types';

export const driverServiceAPI = {
    getAll: async () => {
        const { data } = await api.get<{ allDrivers: DriverService[] }>('/drivers');
        return data.allDrivers.map(d => ({ ...d, id: d._id }));
    },

    getById: async (id: string) => {
        const { data } = await api.get<{ oneDriver: DriverService }>(`/drivers/${id}`);
        return { ...data.oneDriver, id: data.oneDriver._id };
    },

    create: async (payload: Partial<DriverService>) => {
        const { data } = await api.post<{ newDriver: DriverService }>('/drivers', payload);
        return data.newDriver;
    },

    update: async (id: string, payload: Partial<DriverService>) => {
        const { data } = await api.put<{ updatedDriver: DriverService }>(`/drivers/${id}`, payload);
        return data.updatedDriver;
    },

    remove: async (id: string) => {
        const { data } = await api.delete(`/drivers/${id}`);
        return data; // Retorna a mensagem de sucesso do back
    }
};