import { Schema, model } from 'mongoose';
import {PositionInterface} from "../types/position.interface";

const positionSchema = new Schema<PositionInterface>({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { ref: 'categories', type: Schema.Types.ObjectId },
  user: { ref: 'users', type: Schema.Types.ObjectId }
});

export const PositionModel = model<PositionInterface>('positions', positionSchema);
