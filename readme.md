# Processo seletivo XP - Back-end

## Súmario

- [Sobre](#Sobre)
- [Setup](#setup)
    - [Requisitos](#project-requeriments)
    - [Configurações](#project-configurations)
    - [Rodar](#project-run)
    - [Usar](#project-usage)
- [Links]

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
