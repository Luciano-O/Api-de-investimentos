import { Router } from 'express';
import InvestmentsControllers from '../controllers/Investments.controllers';

const stocksRouter = Router();

stocksRouter.get('/ativos/:id', InvestmentsControllers.requestById);

export default stocksRouter;
