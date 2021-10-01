import { Request, Response } from 'express';

export class AnalyticsController {
  getOverview = (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Получить Overview'
    });
  };

  getAnalytics = (req: Request, res: Response): void => {
    res.status(200).json({
        message: 'Получить Analytics'
    });
  };
}
