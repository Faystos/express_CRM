import { Router } from 'express';
import { PositionController } from '../controllers/position.controller';

const positionController: PositionController = new PositionController();
export const positionRoute: Router = Router();
positionRoute.get('/position/:category', positionController.getPosition);
positionRoute.post('/position', positionController.createPosition);
positionRoute.patch('/position/:id', positionController.patchPosition);
positionRoute.delete('/position/:id', positionController.deletePosition);
