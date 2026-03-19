import mongoose, { Schema, Document } from 'mongoose';

export interface ChangeHistoryEntry {
    date: Date;
    changedBy: string;
    field: string;
    oldValue: string | number | boolean | null;
    newValue: string | number | boolean | null;
}

export interface IPromotion extends Document {
    name: string;
    promoCode?: string;
    description?: string;
    promotionType?: 'Sem Cupom' | 'Cupom';
    discountType?: 'Percentual' | 'Valor Fixo';
    discountValue?: number;
    maxDiscountAmount?: number;
    minOrderValue?: number;
    applicableServices?: string[];
    target?: string;
    startDate?: Date;
    endDate?: Date | null;
    status?: string;
    maxUses?: number;
    usedCount?: number;
    autoApply?: boolean;
    priority?: number;
    eligibilityRule?: string;
    createdBy?: string;
    isStackable?: boolean;
    changeHistory?: ChangeHistoryEntry[];
    createdAt: Date;
    updatedAt: Date;
}

const ChangeHistorySchema: Schema = new Schema({
    date: { type: Date, default: Date.now },
    changedBy: { type: String },
    field: { type: String },
    oldValue: { type: Schema.Types.Mixed, default: null },
    newValue: { type: Schema.Types.Mixed, default: null },
}, { _id: false });

const PromotionSchema: Schema = new Schema({
    name: { type: String, required: true },
    promoCode: { type: String },
    description: { type: String },
    promotionType: { type: String, enum: ['Sem Cupom', 'Cupom'], default: 'Cupom' },
    discountType: { type: String, enum: ['Percentual', 'Valor Fixo'], default: 'Percentual' },
    discountValue: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number },
    minOrderValue: { type: Number },
    applicableServices: { type: [String], default: [] },
    target: { type: String, default: 'Todos' },
    startDate: { type: Date },
    endDate: { type: Date, default: null },
    status: { type: String, default: 'Agendada' },
    maxUses: { type: Number },
    usedCount: { type: Number, default: 0 },
    autoApply: { type: Boolean, default: false },
    priority: { type: Number, default: 10 },
    eligibilityRule: { type: String, default: '' },
    createdBy: { type: String },
    isStackable: { type: Boolean, default: false },
    changeHistory: { type: [ChangeHistorySchema], default: [] },
}, {
    timestamps: true,
});

const Promotion = mongoose.model<IPromotion>('Promotion', PromotionSchema);

export default Promotion;
