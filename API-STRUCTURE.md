# Decisões arquiteturais e a estrutura do projeto
Este projeto adota os princípios de Domain-Driven Design (DDD) e Clean Architecture, incorporando o padrão de Repositories, modularização, PubSub Pattern, etc. para a estruturação e organização da lógica de negócios e dos dados. Para persistência utilizamos PrismaORM com PostgreSQL, RabbitMQ para gerenciamento de filas e Redis para validação de tokens.

## Estrutura do projeto
- `.src/common/types.ts`: Camada onde fica todos os tipos da aplicação.

- `./src/config`: Arquivo de configuração de variáveis.

- `./src/app.module.ts`: Arquivo principal do módulo da aplicação.

- `./src/main.ts`: Arquivo de inicialização do projeto.

- `./src/user-auth/domain`: É o coração da aplicação.
   - `./common`: É a pasta compartilhada entre o domínio.
     - `errors`: Camada de erros customizados.
     - `validators`: Camada de validações customizadas.
   - `./entities`: É os arquivos das entidades da regra de negócio. Nela temos: `User`, que é a entidade usuário, e `List`, que é a entidade relacionada a `User` que cria listas.
   - `./repositories`: É a camada que estão as interfaces dos repositórios: `list.repository.ts` e `user.repository.ts`.

   - `./value-objects`: Local que fica os `objetos de valor`, no caso apenas usamos `email.ts` que é o `objeto de valor` da entidade `User`.

- `./src/user-auth/application`: Camada de aplicação.
  - `./dtos`: DTOS da aplicação para troca de dados entre camadas.
  - `./interfaces`: Os contratos da camada de aplicação.
  - `./usecases`: Onde se localiza os casos de uso da aplicação.
       - `create-list.use-case.ts`: Criação de lista por usuário
       - `delete-list.use-case.ts`: Deletar lista por usuário
       - `get-list-by-id.use-case.ts`: Busca lista de usuário
       - `login-user.use-case.ts`: Loga usuário
       - `logout-user.use-case.ts`: Desloga usuário
       - `register-user.use-case.ts`: Cadastra usuário
       - `update-list.use-case.ts`: Atualiza lista de usuário
       - `verify-email.use-case.ts`: Verifica e-mail de usuário

- `./src/user-auth/infra`: Camada de infraestrutura.
    - `./database`: Local de persistência de dados. Nela temos a pasta `Redis` e `Prisma`
    - `./http`: Local de comunicação com application. Nela temos os controllers `list.controller.ts` e `user.controller.ts`
    - `./middlewares`: É onde fica os `middlewares`. E nela temos o `auth.guard.ts` que usamos para validar tokens`
    - `./modules`: Onde ficam os módulos do Nest.JS
    - `./services`: Implementações de serviços externos
        - `./services/queue`: É o lugar que organiza o `producer` e o `consumer` do `Rabbitmq`.
        - `./services/email-token.service.ts`: Serviço de geração de tokens para validação dos e-mails
        - `./services/hash.service.ts`: Serviço para fazer hash de senhas e comparar hashes
        - `./services/jwt-security.service.ts`: Serviço para criar e verificar tokens
        - `./services/mailing.service.ts`: Serviço para envio de e-mails
        

