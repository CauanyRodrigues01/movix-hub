import api from './api';
import type { Promotion } from '../types/promotion.types';

export const getPromotions = async (): Promise<Promotion[]> => {
    const res = await api.get('/promotions');
    return res.data.map((p: any) => ({ ...p, id: p._id ?? p.id }));
};

export const getPromotion = async (id: string): Promise<Promotion> => {
    const res = await api.get(`/promotions/${id}`);
    const p = res.data;
    return { ...p, id: p._id ?? p.id };
};

export const createPromotion = async (payload: Partial<Promotion>): Promise<Promotion> => {
    const res = await api.post('/promotions', payload);
    const p = res.data;
    return { ...p, id: p._id ?? p.id };
};

export const updatePromotion = async (id: string, payload: Partial<Promotion>): Promise<Promotion> => {
    const res = await api.patch(`/promotions/${id}`, payload);
    const p = res.data;
    return { ...p, id: p._id ?? p.id };
};

export const deletePromotion = async (id: string): Promise<void> => {
    await api.delete(`/promotions/${id}`);
};

export default {
    getPromotions,
    getPromotion,
    createPromotion,
    updatePromotion,
    deletePromotion,
};
