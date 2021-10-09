import { Router } from 'express';
import passport from 'passport';
import { PositionController } from '../controllers/position.controller';

const passportPolice = passport.authenticate('jwt', { session: false });
const positionController: PositionController = new PositionController();
export const positionRoute: Router = Router();
positionRoute.get('/position/:categoryId', passportPolice, positionController.getPosition);
positionRoute.post('/position', passportPolice, positionController.createPosition);
positionRoute.patch('/position/:id', passportPolice, positionController.patchPosition);
positionRoute.delete('/position/:id', passportPolice, positionController.deletePosition);
