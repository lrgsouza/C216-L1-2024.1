const restify = require('restify');

// iniciar o servidor
var server = restify.createServer({
    name: 'pratica-2',
});

// configurar o servidor para aceitar JSON e query
server.use(restify.plugins.bodyParser());

// Array para armazenar os alunos
let alunos = [];

// Middleware para permitir o parsing do corpo da requisição
server.use(restify.plugins.bodyParser());

// Endpoint para inserir um novo aluno
server.post('/api/v1/aluno/inserir', (req, res, next) => {
    const { nome, curso, dataNascimento } = req.body;

    // Simulação de inserção no banco de dados
    const novoAluno = {
        id: alunos.length + 1, // Simulação de um ID único
        nome,
        curso,
        dataNascimento
    };

    alunos.push(novoAluno);

    res.send(201, novoAluno);
    return next();
});

// Endpoint para listar todos os alunos
server.get('/api/v1/aluno/listar', (req, res, next) => {
    res.send(alunos);
    return next();
});

// Endpoint para atualizar um aluno existente
server.post('/api/v1/aluno/atualizar', (req, res, next) => {
    const { id, nome, curso, dataNascimento } = req.body;

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex === -1) {
        res.send(404, { message: 'Aluno não encontrado' });
    } else {
        alunos[alunoIndex] = { id, nome, curso, dataNascimento };
        res.send(200, alunos[alunoIndex]);
    }

    return next();
});

// Endpoint para excluir um aluno pelo ID
server.post('/api/v1/aluno/excluir', (req, res, next) => {
    const { id } = req.body;

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex === -1) {
        res.send(404, { message: 'Aluno não encontrado' });
    } else {
        alunos.splice(alunoIndex, 1);
        res.send(200, { message: 'Aluno excluído com sucesso' });
    }

    return next();
});

// iniciar o servidor
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log('Servidor iniciado', server.name, ' na url http://localhost:' + port);
})
