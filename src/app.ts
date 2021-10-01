import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { urlencoded, json } from 'body-parser';

import { orderRouter } from './order/routes/order.route';
import { categoryRoute } from './category/routes/category.route';
import { authRouter } from './auth/routes/auth.toute';
import { positionRoute } from './position/routes/position.route';
import { analyticsRoute } from './analytics/routes/analytics.route';

export const app: Express = express();
app.use(morgan('dev'));
app.use(urlencoded({
  extended: true
}));
app.use(json());
app.use(cors());
app.use('/', authRouter);
app.use('/', orderRouter);
app.use('/', categoryRoute);
app.use('/', positionRoute);
app.use('/', analyticsRoute);
