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
