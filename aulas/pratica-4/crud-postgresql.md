
# Pratica 4 - CRUD com PostgreSQL e Restify.js

Nesta prática adaptaremos nosso código para que agora possamos ter persistencia dos dados. Para isso utilizaremos o banco de dados PostgreSQL e a biblioteca pg para realizar a conexão com o banco de dados.

Utilizaremos o framework Node.js Restify para criar um servidor e implementar os métodos HTTP através da biblioteca pg para persistência dos dados.

Subiremos o middleware e o banco de dados utilizando o Docker Compose.


## Documentação adicional

-   [npm pg](https://www.npmjs.com/package/pg)


## Package.json

```json
{
  "name": "pratica-4",
  "version": "1.0.0",
  "description": "Crud com restify.js",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "restify": "^8.5.1",
    "pg": "^8.11.5"
  },
  "author": "Lucas GES134",
  "license": "ISC"
}

```

## Código-fonte restify com pg

```javascript
const restify = require('restify');
const { Pool } = require('pg');

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres', // Usuário do banco de dados
    host: process.env.POSTGRES_HOST || 'db', // Este é o nome do serviço do banco de dados no Docker Compose
    database: process.env.POSTGRES_DB || 'alunos',
    password: process.env.POSTGRES_PASSWORD || 'password', // Senha do banco de dados
    port: process.env.POSTGRES_PORT || 5432,
  });

// iniciar o servidor
var server = restify.createServer({
    name: 'pratica-4',
});

// Iniciando o banco de dados
async function initDatabase() {
    try {
        await pool.query('DROP TABLE IF EXISTS alunos');
        await pool.query('CREATE TABLE IF NOT EXISTS alunos (id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, curso VARCHAR(255) NOT NULL, data_nascimento VARCHAR(255) NOT NULL)');
        console.log('Banco de dados inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao iniciar o banco de dados, tentando novamente em 5 segundos:', error);
        setTimeout(initDatabase, 5000);
    }
}
// Middleware para permitir o parsing do corpo da requisição
server.use(restify.plugins.bodyParser());

// Endpoint para inserir um novo aluno
server.post('/api/v1/aluno/inserir', async (req, res, next) => {
    const { nome, curso, dataNascimento } = req.body;

    try {
        const result = await pool.query(
          'INSERT INTO alunos (nome, curso, data_nascimento) VALUES ($1, $2, $3) RETURNING *',
          [nome, curso, dataNascimento]
        );
        res.send(201, result.rows[0]);
        console.log('Aluno inserido com sucesso:', result.rows[0]);
      } catch (error) {
        console.error('Erro ao inserir aluno:', error);
        res.send(500, { message: 'Erro ao inserir aluno' });
      }
    return next();
});

// Endpoint para listar todos os alunos
server.get('/api/v1/aluno/listar', async (req, res, next) => {
    try {
      const result = await pool.query('SELECT * FROM alunos');
      res.send(result.rows);
      console.log('Alunos encontrados:', result.rows);
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      res.send(500, { message: 'Erro ao listar alunos' });
    }
    return next();
  });

// Endpoint para atualizar um aluno existente
server.post('/api/v1/aluno/atualizar', async (req, res, next) => {
    const { id, nome, curso, dataNascimento } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE alunos SET nome = $1, curso = $2, data_nascimento = $3 WHERE id = $4 RETURNING *',
        [nome, curso, dataNascimento, id]
      );
      if (result.rowCount === 0) {
        res.send(404, { message: 'Aluno não encontrado' });
      } else {
        res.send(200, result.rows[0]);
        console.log('Aluno atualizado com sucesso:', result.rows[0]);
      }
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      res.send(500, { message: 'Erro ao atualizar aluno' });
    }
  
    return next();
  });

// Endpoint para excluir um aluno pelo ID
server.post('/api/v1/aluno/excluir', async (req, res, next) => {
    const { id } = req.body;
  
    try {
      const result = await pool.query('DELETE FROM alunos WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.send(404, { message: 'Aluno não encontrado' });
      } else {
        res.send(200, { message: 'Aluno excluído com sucesso' });
        console.log('Aluno excluído com sucesso');
      }
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      res.send(500, { message: 'Erro ao excluir aluno' });
    }
  
    return next();
});
// endpoint para resetar o banco de dados
server.del('/api/v1/database/reset', async (req, res, next) => {
    try {
      await pool.query('DROP TABLE IF EXISTS alunos');
      await pool.query('CREATE TABLE alunos (id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, curso VARCHAR(255) NOT NULL, data_nascimento VARCHAR(255) NOT NULL)');
      res.send(200, { message: 'Banco de dados resetado com sucesso' });
      console.log('Banco de dados resetado com sucesso');
    } catch (error) {
      console.error('Erro ao resetar o banco de dados:', error);
      res.send(500, { message: 'Erro ao resetar o banco de dados' });
    }
  
    return next();
});
// iniciar o servidor
var port = process.env.PORT || 5000;
// configurando o CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
server.listen(port, function() {
    console.log('Servidor iniciado', server.name, ' na url http://localhost:' + port);
    // Iniciando o banco de dados
    console.log('Iniciando o banco de dados');
    initDatabase();
});


```

## Código-fonte do Docker Compose
    
```yaml
version: '3'
services:

  db:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: alunos
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  backend:
    build: .
    restart: always
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      NODE_ENV: development
      POSTGRES_USER: postgres
      POSTGRES_HOST: db
      POSTGRES_DB: alunos
      POSTGRES_PASSWORD: password
      POSTGRES_PORT: 5432

volumes:
  db_data:
```

## Código-fonte do arquivo docker_postgres_init.sql

```sql
CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  curso VARCHAR(255) NOT NULL,
  data_nascimento VARCHAR(255) NOT NULL
)
```

# Exercício proposto

1. Atualize a aplicação entregue na pratica 3 para utilizar o postgreSQL.
2. Utilize o exemplo passado em aula para iniciar o banco de dados corretamente.
3. Assim como na ultima prática, execute os testes e exporte os resultados.
4. Suba o print do docker com os resultados na pratica-4/img e subir a collection do postman em pratica-4/api-tests.


[Voltar ao início](../../README.md)