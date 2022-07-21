# Processo seletivo XP - Back-end

## Súmario

- [Sobre](#Sobre)
- [Setup](#setup)
    - [Requisitos](#project-requeriments)
    - [Configurações](#project-configurations)
    - [Rodar](#project-run)
    - [Usar](#project-usage)
- [Links](#links)

## Sobre

Este projeto foi pensado e desenvolvido para o processo seletivo da XP em parceria com a Trybe.

O intuito foi criar uma api que realizasse o CRUD em um banco de dados sql, utilizando o typeORM 
Sequelize para conexão com o banco manipulando os dados de uma aplicação de investimentos, 
realizando ações como: comprar e vender ações, depositar e sacar dinheiro,
alem de requisitar informações sobre clientes e sobre os ativos.

A aplicação foi desenvolvida em TypeScript utilizando NodeJs e tambem utilizando outra bibliotecas como
Express para a criação da api, alem de outras bibliotecas que podem ser consultadas no package.json.

Para os testes foi usado o Jest, alem das bibliotecas mocha, chai e sinon para complementar.

Apesar do uso do TypeScript, o projeto não seguiu o paradigma de orientação à objetos. A arquitetura MSC
foi usada para estruturar essa api, tendo a camada de models sendo controlada pelo Sequelize.

## Setup

Nessa sessão iremos mostrar um passo-a-passo de tudo oque você precisa fazer para rodar esse projeto na sua maquina.
Lembrando que essa api esta documentada e deployada, então caso queira testa-la sem precisar instalar tudo no seu
computador basta clicar <a href="https://luciano-pselxp-back-end.herokuapp.com/docs/">AQUI</a> que você sera redirecionado para a pagina de documentação da aplicação funcionando.

### Requisitos

Você necessita dos seguintes requisitos prévios para que o projeto rode corretamente na sua maquina.

1. NodeJS version:16

### Configurações

Aqui você vai ver todo o passo-a-passo para a execução do projeto.
Lembrando que antes de tudo você deve ter clonado o repositorio antes.

1. No terminal, dentro do diretório do projeto, instale as dependencias usando o comando abaixo
    + `$ npm install`

2. Crie um arquivo .env, nesse arquivo deve conter 
