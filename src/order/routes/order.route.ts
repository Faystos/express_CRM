import { Router } from 'express';
import passport from 'passport';

import { OrderController } from '../controllers/order.controller';

const passportPolice = passport.authenticate('jwt', { session: false });
const orderController: OrderController = new OrderController();
export const orderRouter: Router = Router();

orderRouter.get('/order', passportPolice, orderController.getOrder);
orderRouter.post('/order', passportPolice, orderController.createOrder);
