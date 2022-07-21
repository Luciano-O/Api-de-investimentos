import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import investRouter from './routes/investimentos.routes';
import usersRouter from './routes/clientes.routes';
import stocksRouter from './routes/ativos.routes';
import errorMiddleware from './middlewares/error.middleware';
import 'express-async-errors';
import swaggerConfig from './docs/swagger.config';

const app = express();

const swaggerDoc = swaggerJsDoc(swaggerConfig);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(cors());

app.use(express.json());

app.use(investRouter);
app.use(usersRouter);
app.use(stocksRouter);

app.use(errorMiddleware);

export default app;
