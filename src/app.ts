import express from 'express';
import cors from 'cors';
import investRouter from './routes/investimentos.routes';
import usersRouter from './routes/clientes.routes';
import stocksRouter from './routes/ativos.routes';
import errorMiddleware from './middlewares/error.middleware';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(investRouter);
app.use(usersRouter);
app.use(stocksRouter);
app.use(errorMiddleware);

export default app;
