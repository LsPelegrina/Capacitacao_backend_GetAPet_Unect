# Capacitacao_backend_GetAPet_Unect

## Descrição do Projeto

O projeto consiste no desenvolvimento de uma API RESTful completa para um sistema de
adoção de pets, necessitando dos modelos de usuários e pets. Utilizando node.js, Express e mongoDB, bcrypt, jsonwebtoken e dotenv. 
O modelo de aluno deve possuir os seguintes atributos:<br>
● name (string)<br>
● email (string)<br>
● password (string)<br>
● phone (string)<br>
● createdAt (timestamps do mongoose)<br>
● updatedAt (timestamps do mongoose)<br>

Já o modelo de pet deve possuir os seguintes atributos:<br>
● name (string)<br>
● age (number)<br>
● weight (number)<br>
● color (string)<br>
● available (boolean)<br>
● user (object)<br>
● adopter (object)<br>
● createdAt (timestamps do mongoose)<br>
● updatedAt (timestamps do mongoose)<br>

O foco desse projeto é capacitar os membros no básico de como desenvolver uma API com
node.js, Express e mongoDB, desenvolvendo todas as principais operações de um backend
web e na criação de rotas para autenticação e validação de token para autorização.<br>


## Primeira entrega

No dia da entrega (29/04) deverá ser entregue o repositório do projeto no github possuindo todas as rotas relacionadas
ao usuário:<br>
● POST para cadasro de usuários<br>
● POST para login de usuários<br>
● GET que retorne um usuário a partir do seu ID<br>
● PATCH para atualizaçao de um usuário a partir do seu ID<br>
● DELETE para exclusão de um usuário a partir do seu ID<br>


## Segunda entrega

No dia da entrega (15/05) deverá ser entregue o repositório do projeto no github contendo todas as
rotas de usuários e pets para atender aos requisitos do projeto, junto com a documentação das
rotas (se houver):<br>
● POST para cadasro de pets(*validar token)<br>
● GET que retorne todos os pets<br>
● GET que retorne todos os pets do usuário logado(*validar token)<br>
● GET que retorne um pet a partir do seu ID<br>
● PATCH para atualizaçao de um pet a partir do seu ID(*validar token)<br>
● DELETE para exclusão de um pet a partir do seu ID(*validar token)<br>
● PATCH para agendar uma visita(*validar token)<br>
● PATCH para concluir uma adoção(*validar token)<br>

●EXTRA: Documentação das rotas da API, ferramenta a critério do desenvolvedor
(Swagger, Postman etc.)

## Documentação

A documentação da API foi feita utilizando o swagger-ui, para acessar a documentação entre no path /api-docs/, onde estão todas as rotas.

## Teste de rotas

Para o teste das rotas foi utilizado uma extensão do visual studio code, onde você cria um arquivo .http, e consegue fazer requisições para API, o arquivo está no repositorio explicado, e de fácil acesso, e uso.
