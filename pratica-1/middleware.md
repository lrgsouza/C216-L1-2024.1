## Pratica 1 - Middleware com restify

O restify é um framework de servidor para Node.js, ele é uma alternativa para o Express.js e é mais simples de se utilizar.

Para mais informações sobre o restify acesse a documentação oficial:

- [Restify](http://restify.com/)

### Postman - Testes de API
- [Download Postman](https://www.postman.com/downloads/)

### Docker Desktop
- [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Como iniciar um servidor com restify

## 01 - Declarar a biblioteca restify no package.json
```json
{
  "name": "pratica-1",
  "version": "1.0.0",
  "description": "Middleware com restify.js",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "Não há testes configurados"
  },
  "dependencies": {
    "restify": "^8.5.1"
  },
  "author": "NOME MATRICULA",
  "license": "ISC"
}

```
## 02 - instalar as dependencias utilizando npm
No terminal execute o seguinte:
```bash
cd ./pratica-1
npm install
```
Isso fará com que todas as dependências do projeto sejam instaladas.

## 03 - Para iniciar um servidor com restify é simples, no arquivo index.js:

```js


const restify = require('restify');

// iniciar o servidor
var server = restify.createServer({
    name: 'pratica-1',
});

// configurar o servidor
server.use(restify.plugins.bodyParser());

// configurar as rotas e funções
function helloWorld(req, res, next) {
    var name = '[NOME] - [SUA MATRICULA]';
    res.setHeader('Content-Type', 'application/json');
    res.charSet('UTF-8');
    res.send('Hello ' + name);
    next();
}

// rota configurada para a função helloWorld
server.get('/api/v1/hello', helloWorld );

// rota configurada com parametros passador na rota
server.get('/', function(req, res, next) {
    var name = '[NOME] - [SUA MATRICULA]';
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

```
## 04 - Executar o server
```bash
npm start
```
- Seu servidor foi iniciado e pode ser acessado na url http://localhost:5000
- Teste a url http://localhost:5000/
- Teste a url http://localhost:5000/api/v1/hello

## 05 - Verificar os resultados no navegador ou via postman e salvar os 2 prints na pasta img

Tirar um print e colocar na pasta img.

```bash
./src/home.png
./src/api-hello.png
```

# OBSERVAÇÃO IMPORTANTE
### Garantir que o repositório contenha o arquivo .gitignore com o conteúdo abaixo:
```git
node_modules/
```
### Isso fará com que o os arquivos do *_node_modules_* não sejam enviados ao git.
---
# BÔNUS: Quem executar o projeto com docker, terá 50 pontos extras.
```
docker-compose up --build
``` 
(tirar print e colocar na pasta img com o nome docker.png)

[Voltar ao início](../README.md)