const restify = require('restify');

// iniciar o servidor
var server = restify.createServer({
    name: 'pratica-2',
});

// definir o nome padrão
const defaultName = 'Lucas - GES134';

// configurar o servidor para aceitar JSON e query
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// rota configurada para a função helloWorld
server.get('/api/v1/hello', function(req, res) {
    let name = defaultName;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Hello ' + name);
});

// rota para verificar params no path
server.get('/api/v1/params/:name', function(req, res, next) {
    let name = req.params.name;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Parametro passado na rota: ' + name);
    next();
});

// rota para verificar query params
server.get('/api/v1/query', function(req, res) {
    let name = req.query.name;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Query passado na requisição: ' + name);
});

// Testando o POST na home
server.post('/', function(req, res) {
    //verificando se há body passado na requisição
    let name = defaultName;
    if(req.body){
        name = req.body.name;
    }
    // Definir o cabeçalho de resposta como HTML
    res.setHeader('Content-Type', 'text/html');
    // Corpo da resposta - uma página HTML básica
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HomePage Post Test</title>
        </head>
        <body>
            <h1>Obtendo o body da requisição: ${name} foi passado</h1>
        </body>
        </html>
    `;
    // Enviar a resposta
    res.write(html);
    res.end();
})

// rota configurada com parametros passador na rota
server.get('/', function(req, res) {
    //verificando se há body passado na requisição
    let name = defaultName;
    // Definir o cabeçalho de resposta como HTML
    res.setHeader('Content-Type', 'text/html');
    // Corpo da resposta - uma página HTML básica
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Minha API com restify.js</title>
        </head>
        <body>
            <h1>Página HTML de ${name}</h1>
            <p>Esta página é apenas um exemplo</p>
        </body>
        </html>
    `;
    // Enviar a resposta
    res.write(html);
    res.end();
})

// ============================= BONUS =============================
//iniciando repositorio
var repositorio = [];
// rota com method POST salvar no repositorio
server.post('/api/v1/add', function(req, res, next) {
    repositorio.push(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send(201, { message: 'Resource created' });
    next();
});
// rota com method GET buscar no repositorio
server.get('/api/v1/list', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send(repositorio);
    next();
});
// rota com method DELETE deletar tudo no repositorio
server.del('/api/v1/list', function(req, res, next) {
    repositorio = [];
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send(200, { message: 'Resource deleted' });
    next();
});
// ============================= BONUS =============================

// iniciar o servidor
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log('Servidor iniciado', server.name, ' na url http://localhost:' + port);
})
