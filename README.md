<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://scontent.fbel11-1.fna.fbcdn.net/v/t39.30808-6/326276698_1226104554686788_1454751807602024544_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=KiMVdYyczRgQ7kNvgHf8PjD&_nc_zt=23&_nc_ht=scontent.fbel11-1.fna&_nc_gid=AR6-P6lIhbO6KDHCeKbjar-&oh=00_AYB0cO2u4G3nC_oCzS1YFQVNJMvJvbANZ1lJyGMXgWRJAw&oe=67A6FBB0" width="200" alt="Nest Logo" /></a>
</p>
  <p align="center">Teste técnico para <a href="https://chat2desk.com.br/" target="_blank">Chat2Desk</a> com finalidade de demonstrar minhas aptidões técnicas.</p>

# Sobre a solução
Este projeto é uma aplicação de cadastro e autenticação feita com NestJS e Express, seguindo a Clean Architecture. Ele oferece funcionalidades como cadastro de usuários, login, logout, e gerenciamento de listas. O fluxo de autenticação envolve o envio de um e-mail de validação com Nodemailer e gerenciamento de filas de e-mail usando RabbitMQ no padrão Pub/Sub.

Ao cadastrar ou logar, o sistema gera um JWT para autenticação. No caso de logout, o token é invalidado com Redis. As rotas que exigem autenticação são protegidas por um middleware que verifica a validade do token.

A criação de listas pelos usuários é uma funcionalidade disponível, mas é uma rota protegida, ou seja, só pode ser acessada por usuários autenticados. O projeto é dividido em camadas: Domain, que lida com as regras de negócio; Application, que gerencia os serviços e fluxos; e Infra, responsável pela comunicação com serviços externos como Redis e RabbitMQ.

Essa arquitetura facilita a escalabilidade e a manutenção da aplicação, garantindo segurança e boa performance.

## Requisitos
- Uma conta na Google
- Senha de APP do Gmail para o uso de envio de e-mails
- Node LTS
- Docker

### Como executar em minha máquina?
- Clone o projeto em sua máquina: `git clone https://github.com/normyee/authentication-system.git`
- Entre no projeto: `cd uthentication-system`
`
- Crie um arquivo no pasta raiz com nome de `.env`
- Abra o `.env.example` e passe no `.env` as mesmas variáveis
- Instale as dependências: `npm install`
- Builde a aplicação: `npm run build`
- Inicialize o contêiner: `docker-compose up -d`
- Crie as migrations da schema do prisma: `npx prisma migrate dev --name init`
- Inicialize a aplicação: `npm run start:prod`
  
#### Pronto 🎉
- Agora pode cadastrar o seu usuário em `/localhost:3000/auth/signup`
## Documentação
- [Como o Backend está estruturado?](API-STRUCTURE.md/)

### Endpoints
`POST - /auth/signup`
```
http://localhost:3000/auth/signup -> Cadastra um novo usuário.
```
#### Exemplo:
```
{
    "name": "user",
    "email": "user@gmail.com",
    "password": "user123pass_"
}
```
----------------------------------------------------------------------------------
`POST - /auth/login`
```
http://localhost:3000/auth/login-> retorna um bearer token que usaremos para acessar rotas protegidas
```

#### Exemplo:
```
{
    "email": "user@gmail.com",
    "password": "user123pass_"
}
```

#### Retorno:
```
{
    "data": {
        "accessToken": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM4NzU1NTA4LCJleHAiOjE3Mzg3NTkxMDh9.zBnnH7nwYhGwjAZ3J6MHbohnPHnciHjEtBzxQkJWlvA"
        }
    },
    "message": "Login efetuado com successo",
    "success": true
}
```
----------------------------------------------------------------------------------
`GET - /auth/logout`
```
http://localhost:3000/auth/logout-> Desloga usuário. É necessário que passemos o bearer token gerado pelo login
```
----------------------------------------------------------------------------------
`POST - /list`
```
http://localhost:3000/list -> Cria uma lista.
```
#### Exemplo:
```
{
    "name": "jogos",
    "items": ["minecraft"]
}
```
----------------------------------------------------------------------------------
`GET - /list/:id`
```
http://localhost:3000/list -> Busca uma lista de um usuário.
```










   