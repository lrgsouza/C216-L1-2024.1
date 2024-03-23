## Pratica 2 - Metodos HTTP

- [Restify](http://restify.com/)

### Postman - Testes de API
- [Download Postman](https://www.postman.com/downloads/)

### Docker Desktop
- [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Entender os metodos HTTP
- [HTTP Methods](https://www.restapitutorial.com/lessons/httpmethods.html)

# Métodos HTTP e Exemplos em Node.js com Restify

Vamos abordar os métodos HTTP básicos utilizados em arquiteturas REST (Representational State Transfer). Utilizaremos o framework Node.js Restify para demonstrar cada método com exemplos práticos.

## Métodos HTTP Básicos

1. **GET**: O método GET solicita a representação de um recurso específico. Requisições GET devem apenas recuperar dados e não devem causar efeitos colaterais no servidor.

2. **POST**: O método POST é usado para enviar dados para o servidor para criar um novo recurso.

3. **PUT**: O método PUT substitui todas as atuais representações do recurso de destino pela carga de dados da requisição.

4. **DELETE**: O método DELETE remove um recurso específico do servidor.

5. **PATCH**: O método PATCH é usado para aplicar modificações parciais em um recurso.

## Exemplos em Node.js com Restify

A seguir, exemplos de como implementar utilizando Node.js com o framework Restify:

```javascript
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

// GET - rota configurada para a função helloWorld
server.get('/api/v1/hello', function(req, res) {
    let name = defaultName;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Hello ' + name);
});

// GET - rota para verificar params no path
server.get('/api/v1/params/:name', function(req, res, next) {
    let name = req.params.name;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Parametro passado na rota: ' + name);
    next();
});

// GET - rota para verificar query params
server.get('/api/v1/query', function(req, res) {
    let name = req.query.name;
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Query passado na requisição: ' + name);
});

// POST - Testando o POST na home
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

// GET - rota configurada com parametros passador na rota
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
//iniciando um repositorio vazio
var repositorio = [];
// POST - rota com method POST salvar no repositorio
server.post('/api/v1/add', function(req, res, next) {
    repositorio.push(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send(201, { message: 'Resource created' });
    next();
});
// GET - rota com method GET mostrar tudo no repositorio
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


```
Estes são exemplos básicos de como implementar os métodos HTTP utilizando Node.js com Restify. Lembre-se de adaptar a lógica dentro de cada rota conforme necessário para atender aos requisitos específicos da sua aplicação.

---

## Exercício Proposto

1. Adequear a estrutura do projeto e implementar os métodos HTTP.
2. Executar o backend utilizando docker.
3. Desenvolver uma suíte de testes no Postman (pode usar a da aula como base).
4. Rodar os testes e exportar os resultados.
5. Subir os resultados na pasta pratica-2/api-tests.
6. Subir os print solicitados na pratica-2/img.
7. Subir a collection editada na pratica-2/postman.


# OBSERVAÇÃO IMPORTANTE
### Garantir que o repositório contenha o arquivo .gitignore com o conteúdo abaixo:
```git
node_modules/
```
### Isso fará com que o os arquivos do *_node_modules_* não sejam enviados ao git.
---
# O PROJETO DEVERÁ SER EXECUTADO USANDO DOCKER!!!
```
docker-compose up --build
``` 
(tirar print e colocar na pasta img com o nome docker.png)

[Voltar ao início](../../../README.md)