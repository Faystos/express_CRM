import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const orderController: OrderController = new OrderController();
export const orderRouter: Router = Router();

orderRouter.get('/order', orderController.getOrder);
orderRouter.post('/order', orderController.createOrder);
