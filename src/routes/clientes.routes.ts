import { Router } from 'express';
import UsersController from '../controllers/Users.controller';
import generateToken from '../middlewares/generateToken.middleware';
import validateToken from '../middlewares/validateToken.middleware';

const usersRouter = Router();

usersRouter.get('/conta/ativos/:id', UsersController.getStocksByClient);
usersRouter.get('/conta/token', generateToken);
usersRouter.get('/conta/:id', UsersController.getById);
usersRouter.post('/conta/deposito', validateToken, UsersController.deposit);
usersRouter.post('/conta/saque', validateToken, UsersController.withdrawal);

export default usersRouter;
