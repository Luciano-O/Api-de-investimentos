import { Router } from 'express';
import InvestmentsControllers from '../controllers/Investments.controllers';
import validateToken from '../middlewares/validateToken.middleware';

const investRouter = Router();

investRouter.post('/investimentos/comprar', validateToken, InvestmentsControllers.create);
investRouter.post('/investimentos/vender', validateToken, InvestmentsControllers.update);

export default investRouter;
