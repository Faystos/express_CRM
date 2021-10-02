import { Schema, model } from 'mongoose';
import { CategoryInterface } from '../types/category.interface';

const categorySchema = new Schema<CategoryInterface>({
  name: { type: String, required: true },
  imageSrc: { type: String, default: '', required: true },
  user: { ref: 'users', type: Schema.Types.ObjectId }
});

export const CategoryModel = model<CategoryInterface>('categories', categorySchema);
