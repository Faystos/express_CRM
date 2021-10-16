import { Schema } from 'mongoose';

export interface CategoryInterface {
  name: string;
  imageSrc: string;
  user: Schema.Types.ObjectId;
}
