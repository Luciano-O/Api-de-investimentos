import express from 'express';
import cors from 'cors';
import investRouter from './routes/investimentos.routes';
import usersRouter from './routes/clientes.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(investRouter);
app.use(usersRouter);

export default app;
