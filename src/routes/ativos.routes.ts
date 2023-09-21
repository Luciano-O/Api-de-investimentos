import { Router } from 'express';
import InvestmentsControllers from '../controllers/Investments.controllers';

const stocksRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Ativo
 *    description: Endpoint que fornece informações dos ativos
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Ativo:
 *        type: object
 *        required:
 *          - CodAtivo
 *          - QtdeAtivo
 *          - Valor
 *        properties:
 *          CodAtivo:
 *            type: number
 *          QtdeAtivo:
 *            type: number
 *          Valor:
 *            type: number
 *        example:
 *          CodAtivo: 1
 *          QtdeAtivo: 99
 *          Valor: 14.57
 */

/**
 * @swagger
 *  /ativos/{id}:
 *    get:
 *      tags: [Ativo]
 *      description: Endpoint que retorna todas as ações possuidas pelo cliente com base em seu id,
 *        referente ao quarto requisito proposto no desafio
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Ativo'
 */

stocksRouter.get('/ativos/:id', InvestmentsControllers.requestById);

/**
 * @swagger
 *  /ativos:
 *    get:
 *      tags: [Ativo]
 *      description: Endpoint que retorna todas as ações
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Ativo'
 */

stocksRouter.get('/ativos', InvestmentsControllers.getAllStocks);

export default stocksRouter;
