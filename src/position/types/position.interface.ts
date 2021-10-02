import { Schema } from 'mongoose';

export interface PositionInterface {
  name: string;
  cost: number;
  category: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
