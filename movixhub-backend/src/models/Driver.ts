import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
    // Fields required for driver management
    fullName: string;
    cnh: string;
    employment_relationship: string;
    total_deliveries: number;
    rating: number;
    status: 'Active' | 'Inactive' | 'Blocked' | 'Suspended';
   
    // Metadata (BaseEntity)
    createdAt: Date;
    updatedAt: Date;
}

const DriverSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    cnh: { type: String, required: true, unique: true },
    employment_relationship: { type: String, required: true },
    total_deliveries: { type: Number, },

    // Safety limit for rating
    rating: { 
        type: Number, 
        default: 0.0,
        min: [0, 'Rating mínimo é 0'],
        max: [5, 'Rating máximo é 5'], // <-- Limit the rating to 5
        // Ensures the number has only one decimal place
        set: (v: number) => Math.round(v * 10) / 10 
    },

    // Default value for status
    status: { 
        type: String, 
        required: true, 
        default: 'Active',
        enum: ['Active', 'Inactive', 'Blocked', 'Suspended']
    },

    clients: [{type: mongoose.Schema.Types.ObjectId, ref: "Client"}]
}, {
    timestamps: true,
});

const Driver = mongoose.model<IDriver>('Driver', DriverSchema);

export default Driver;