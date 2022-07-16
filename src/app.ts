import express from 'express';
import cors from 'cors';
import investRouter from './routes/investimentos.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(investRouter);

export default app;
