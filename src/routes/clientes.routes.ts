import { Router } from 'express';
import UsersController from '../controllers/Users.controller';

const usersRouter = Router();

usersRouter.get('/conta/ativos/:id', UsersController.getStocksByClient);
usersRouter.get('/conta/:id', UsersController.getById);
usersRouter.post('/conta/deposito', UsersController.deposit);
usersRouter.post('/conta/saque', UsersController.withdrawal);

export default usersRouter;
