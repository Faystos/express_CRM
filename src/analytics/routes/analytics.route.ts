import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';

const analyticsController: AnalyticsController = new AnalyticsController();
export const analyticsRoute: Router = Router();
analyticsRoute.get('/overview', analyticsController.getOverview);
analyticsRoute.get('/analytics', analyticsController.getAnalytics)
