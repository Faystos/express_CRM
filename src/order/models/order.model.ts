import { Schema, model } from 'mongoose';
import { OrderInterface } from '../types/order.interface';

const orderSchema = new Schema<OrderInterface>({
  date: { type: Date, default: Date.now },
  order: { ref: 'orders', type: Number },
  user: { ref: 'users', type: Schema.Types.ObjectId },
  list: [{
    name: { type: String },
    quantity: { type: Number },
    cost: { type: Number }
  }]

});
export const OrderModel = model<OrderInterface>('orders', orderSchema);
