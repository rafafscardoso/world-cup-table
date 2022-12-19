## Tabela da copa do mundo

Essa é uma aplicação FullStack Serverless desenvolvida utilizando a stack T3 (NextJs, Typescript, TailwindCSS, Prisma e NextAuth).

Deploy da aplicação:

https://world-cup-table-wb1l.vercel.app/

## Instalação

Clone o repositório

```bash
git clone https://github.com/rafafscardoso/world-cup-table.git
```

Instale as dependências

```bash
yarn
```

Crie um arquivo `.env` usando o `.env.example` e altere o endereço do banco de dados `DATABASE_URL`.

Depois de atualizar o `.env` com o novo banco de dados, rode o comando para gerar as tabelas e as migrações

```bash
yarn prisma migrate dev
```

Para preencher as tabelas com os jogos, rode o comando

```bash
yarn seed
```

Para rodar em ambiente de desenvolvimento, rode o comando

```bash
yarn dev
```

Para rodar em produção, primeiro rode o comando

```bash
yarn build
```

e depois de completar o `build` rode o comando

```bash
yarn start
```
