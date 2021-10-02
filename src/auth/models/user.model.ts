import { Schema, model } from 'mongoose';
import { UserInterface } from '../types/user.interface';

const userModel = new Schema<UserInterface>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const UserModel = model<UserInterface>('users', userModel);
