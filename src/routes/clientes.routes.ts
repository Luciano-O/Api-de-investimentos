import { Router } from 'express';
import UsersController from '../controllers/Users.controller';

const usersRouter = Router();

usersRouter.get('/conta/:id', UsersController.getById);

export default usersRouter;
