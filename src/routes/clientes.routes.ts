import { Router } from 'express';
import UsersController from '../controllers/Users.controller';
import validateToken from '../middlewares/validateToken.middleware';

const usersRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Conta
 *    description: Endpoint que fornece e manipula as informações dos usuarios
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Cliente:
 *        type: object
 *        required:
 *          - balance
 *          - name
 *          - password
 *          - email
 *        properties:
 *          CodCliente:
 *            type: number
 *          balance:
 *            type: number
 *          name:
 *            type: string
 *          password:
 *            type: string
 *          email:
 *            type: string
 *        example:
 *          CodCliente: 1
 *          name: Trybe
 *          balance: 265.42
 *          password: abcd1234
 *      AtivosCliente:
 *        type: object
 *        required:
 *          - CodCliente
 *          - CodAtivo
 *          - QtdeAtivo
 *        properties:
 *          CodCliente:
 *            type: number
 *          CodAtivo:
 *            type: number
 *          QtdeAtivo:
 *            type: number
 *          Valor:
 *            type: number
 *        example:
 *          CodCliente: 1
 *          QtdeAtivo: 1
 *          CodAtivo: 70
 *          Valor: 14.57
 */

/**
 * @swagger
 *  /conta/ativos/{id}:
 *    get:
 *      tags: [Conta]
 *      description: Endpoint que retorna todas as ações possuidas pelo cliente com base em seu id,
 *        referente ao terceiro requisito proposto no desafio
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
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/AtivosCliente'
 */
usersRouter.get('/conta/ativos/:id', UsersController.getStocksByClient);

/**
 * @swagger
 *  /conta/login:
 *    post:
 *      tags: [Conta]
 *      description: Endpoint que retorna um token de autenticação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                require:
 *                  - token
 *                properties:
 *                  token:
 *                    type: string
 */
usersRouter.post('/conta/login', UsersController.login);

/**
 * @swagger
 *  /conta/register:
 *    post:
 *      tags: [Conta]
 *      description: Endpoint que retorna um token de autenticação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                require:
 *                  - token
 *                properties:
 *                  token:
 *                    type: string
 */
usersRouter.post('/conta/register', UsersController.register);

/**
 * @swagger
 *  /conta/{id}:
 *    get:
 *      tags: [Conta]
 *      description: Endpoint que retorna todas as informações do cliente e seus ativos,
 *        referente ao ultimo requisito proposto no desafio
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
 *                properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *                  balance:
 *                    type: number
 *                  stocks:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: number
 *                        name:
 *                          type: string
 *                        price:
 *                          type: string
 *                        buyedStocks:
 *                          type: object
 *                          properties:
 *                            quantity:
 *                              type: number
 */
usersRouter.get('/conta/:id', UsersController.getById);

/**
 * @swagger
 *  /conta/deposito:
 *    post:
 *      tags: [Conta]
 *      description: Endpoint que realiza um deposito na conta do cliente com base no id,
 *        referente ao quinto requisito proposto no desafio.
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
 *                Valor:
 *                  type: number
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CodCliente:
 *                    type: number
 *                  Valor:
 *                    type: number
 */
usersRouter.post('/conta/deposito', validateToken, UsersController.deposit);

/**
 * @swagger
 *  /conta/saque:
 *    post:
 *      tags: [Conta]
 *      description: Endpoint que realiza um saque na conta do cliente com base no id,
 *        referente ao sexto requisito proposto no desafio.
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
 *                Valor:
 *                  type: number
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CodCliente:
 *                    type: number
 *                  Valor:
 *                    type: number
 */
usersRouter.post('/conta/saque', validateToken, UsersController.withdrawal);

export default usersRouter;
