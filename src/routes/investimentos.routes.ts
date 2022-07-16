import { Router } from 'express';
import InvestmentsControllers from '../controllers/Investments.controllers';

const investRouter = Router();

investRouter.post('/investimentos/comprar', InvestmentsControllers.create);
investRouter.post('/investimentos/vender', InvestmentsControllers.update);

export default investRouter;
