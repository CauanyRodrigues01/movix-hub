import mongoose, { Schema, Document } from 'mongoose';

export interface IPromotion extends Document {
    title: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    discountPercent?: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PromotionSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    active: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const Promotion = mongoose.model<IPromotion>('Promotion', PromotionSchema);

export default Promotion;
