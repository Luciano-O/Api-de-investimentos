import { Router } from 'express';
import InvestmentsControllers from '../controllers/Investments.controllers';
import validateToken from '../middlewares/validateToken.middleware';

const investRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Investimentos
 *    description: Endpoint que realiza as compras e vendas de ações
 */

/**
 * @swagger
 *  /investimentos/comprar:
 *    post:
 *      tags: [Investimentos]
 *      description: Endpoint que realiza uma compra com base nos ids do cliente e do ativo,
 *        referente ao primeiro requisito proposto no desafio.
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                CodCliente:
 *                  type: number
 *                CodAtivo:
 *                  type: number
 *                QtdeAtivo:
 *                  type: number
 *              example:
 *                CodCliente: 1
 *                CodAtivo: 1
 *                QtdeAtivo: 20
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CodCliente:
 *                    type: number
 *                  CodAtivo:
 *                    type: number
 *                  QtdeAtivo:
 *                    type: number
 *                example:
 *                  CodCliente: 1
 *                  CodAtivo: 1
 *                  QtdeAtivo: 20
 */
investRouter.post('/investimentos/comprar', validateToken, InvestmentsControllers.create);

/**
 * @swagger
 *  /investimentos/vender:
 *    post:
 *      tags: [Investimentos]
 *      description: Endpoint que realiza uma venda com base nos ids do cliente e do ativo,
 *        referente ao segundo requisito proposto no desafio.
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                CodCliente:
 *                  type: number
 *                CodAtivo:
 *                  type: number
 *                QtdeAtivo:
 *                  type: number
 *              example:
 *                CodCliente: 1
 *                CodAtivo: 1
 *                QtdeAtivo: 20
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              properties:
 *                CodCliente:
 *                  type: number
 *                CodAtivo:
 *                  type: number
 *                QtdeAtivo:
 *                  type: number
 *              example:
 *                CodCliente: 1
 *                CodAtivo: 1
 *                QtdeAtivo: 20
 */
investRouter.post('/investimentos/vender', validateToken, InvestmentsControllers.update);

export default investRouter;
