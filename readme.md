TROCAR PARA 
Crud-2B - Sistema de caixa para supermercados

DOcket
app com volume para atualizar em tempo real
& postgres

USER
{
id
carrinhoId
name
email
password
}

POST /users/signup - Criar usuario
POST  /users/signin - gerar JWT (Famoso login)
GET /users - Listar todos os usuarios
GET /users/cart - Pegar dados do carrinho (Rota protegida)


PRODUTO
- POST /cart/product - Criar produto  (Rota protegida)
- PUT  /cart/product - ALTERAR PRODUTO  (Rota protegida)
- DELETE /cart/product - Remover producto  (Rota protegida)


COMANDOS : 
yarn init -y

yarn add typeorm@0.2.45 express reflect-metadata pg
yarn add nodemon typescript @types/node @types/express ts-node -D

yarn tsc --init

Descomentar os decorators no tsconfig.json


