# Luciano Oliveira - Processo seletivo XP - Back-end

## Súmario

- [Sobre](#sobre)
- [Autênticação](#autenticacao)
- [Docker](#docker)
- [Setup](#setup)
    - [Requisitos](#requisitos)
    - [Configurações](#configurações)
    - [Rodar](#rodar)
    - [Usar](#usar)
- [Links](#links)

## Sobre

Este projeto foi pensado e desenvolvido para o processo seletivo da XP em parceria com a Trybe.

O intuito foi criar uma api que realizasse o CRUD em um banco de dados sql, utilizando o typeORM 
Sequelize para conexão com o banco manipulando os dados de uma aplicação de investimentos, 
realizando ações como: comprar e vender ações, depositar e sacar dinheiro,
alem de requisitar informações sobre clientes e sobre os ativos.

A aplicação foi desenvolvida em TypeScript utilizando NodeJs e tambem utilizando outra bibliotecas como
Express para a criação da api, alem de outras bibliotecas que podem ser consultadas no package.json.

Para os testes foi usado o Jest, alem das bibliotecas mocha, chai e sinon para complementar e para executa-los
basta usar o comando:    `npm test`.

Apesar do uso do TypeScript, o projeto não seguiu o paradigma de orientação à objetos. A arquitetura MSC
foi usada para estruturar essa api, tendo a camada de models sendo controlada pelo Sequelize.

## Autênticação

Essa api usa o padrão Bearer para autêticação, e a biblioteca json-web-token para gerar e autêticar os tokens
necessarios para o uso de certar rotas.

Como vera na documentação, algumas rotas necessitam do token para serem acessadas, você pode conseguir esse token
através da rota /conta/token como descrito na documentação.

## Docker

Nessa seção você vera como rodar a api através do Docker, que é a maneira como recomendamos que ela seja executada.

Lembrando que antes de tudo você deve ter clonado o repositorio antes e possuir o Docker instalado.

1. No terminal, dentro do diretório do projeto, instale as dependencias usando o comando abaixo
    + `$ npm install`
    + `$ docker-compose up -d`
    + `$ exec -it psel-xp bash`
2. Nesse momento você tera entrado no terminal do container, uma vez presente nele, realize os seguintes comandos.
    + `$ npm run build`
    + `$ npm run db:reset`
    + `$ npm start`

E pronto, agora a api ja esta rodando através do Docker na sua maquina, na porta 3000, podendo ser acessada pelo endereço
"http://localhost:3000". considere começar os testes pelo endereço, "http://localhost:3000/docs"

## Setup

Nessa sessão iremos mostrar um passo-a-passo de tudo oque você precisa fazer para rodar esse projeto na sua maquina.
Lembrando que essa api esta documentada e deployada, então caso queira testa-la sem precisar instalar tudo no seu
computador basta clicar <a href="https://luciano-pselxp-back-end.herokuapp.com/docs/">AQUI</a> que você sera redirecionado para a pagina de documentação da aplicação funcionando.

### Requisitos

Você necessita dos seguintes requisitos prévios para que o projeto rode corretamente na sua maquina.

1. NodeJS version:16
2. MySql version:8

### Configurações

Aqui você vai ver todo o passo-a-passo para a execução do projeto.
Lembrando que antes de tudo você deve ter clonado o repositorio antes.

1. No terminal, dentro do diretório do projeto, instale as dependencias usando o comando abaixo
    + `$ npm install`

2. Crie um arquivo .env, nesse arquivo deve conter as variaveis de ambiente que a api necessita para funcionar
    + DB_USER = armazena o usuario do banco de dados
    + DB_PASS = armazena a senha do banco de dados
    + DB_NAME = armazena o nome do banco de dados
    + DB_HOST = armazena o host do banco de dados
    + DB_PORT = armazena a porta do banco de dados
    + DB_DIALECT = armazena o dialeto, que representa o banco de dados que sera usado, podendo ser mysql ou postgres
    + JWT_SECRET = armazena o segredo para encriptação do token de autenticação

3. Após configurar as variaveis, você deve criar e popular o banco de dados, para isso use o comando abaixo
    + `$ npm run db:reset`

### Rodar

Após tudo configurado, siga os passos abaixo para rodas a api.

1. Execute o build da api
    + `$ npm run build`

2. Então coloque ela para rodas.
    + `$ npm start`

### Usar

Se você seguiu todos os passos coretamente a api ja deve estar funcionando.

Para testar tente acessar pelo seu navegador a rota "http://localhost:PORT/docs" onde "PORT" equivale a variavel
de ambiente que você preencheu no arquivo .env.

Caso queira verificar quais endpoints estão ativos para uso, basta acessar o endereço mencionado no paragrafo
acima ou então clicar <a href="https://luciano-pselxp-back-end.herokuapp.com/docs/">AQUI</a>, que você sera redirecionado para a pagina de documentação da api ja deployada.

## Links

* [Documentação e aplicação deployada](https://luciano-pselxp-back-end.herokuapp.com/docs/)
* [LinkedIn](https://www.linkedin.com/in/lucianoog/)
