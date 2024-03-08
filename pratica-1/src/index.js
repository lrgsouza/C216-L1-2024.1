const restify = require('restify');

// iniciar o servidor
var server = restify.createServer({
    name: 'pratica-1',
});

// configurar o servidor
server.use(restify.plugins.bodyParser());

// configurar as rotas e funções
function helloWorld(req, res, next) {
    var name = 'Lucas - GES134';
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Hello ' + name);
    next();
}

// rota configurada para a função helloWorld
server.get('/api/v1/hello', helloWorld );

// rota configurada com parametros passador na rota
server.get('/', function(req, res, next) {
    var name = 'Lucas - GES134';
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
    next();
})

// iniciar o servidor
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log('Servidor iniciado', server.name, ' na url http://localhost:' + port);
})
