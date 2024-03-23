# Parte 2: Node.js com NVM (Node Version Manager)

## O que é o Node.js?
Node.js é um ambiente de execução JavaScript construído sobre o motor V8 do Google Chrome. Ele permite que você execute código JavaScript no lado do servidor.

## Por que usar o NVM?
O NVM (Node Version Manager) é uma ferramenta que permite instalar e gerenciar várias versões do Node.js no mesmo sistema. Isso é útil quando você trabalha em projetos que podem exigir versões diferentes do Node.js.

### Instalação do NVM LINUX
Você pode instalar o NVM executando o seguinte comando no terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Após a instalação, feche e reabra o terminal ou execute:

```bash
source ~/.bashrc
```

para recarregar as configurações do terminal

### Instalação do NVM WINDOWS

- [Documentação](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
- [Download instalador nvm Windows](https://github.com/coreybutler/nvm-windows/releases)

Se estiver usando o Visual Studio Code, você precisará fechar e vscode o terminal para que o NVM seja reconhecido no terminal integrado.

### Uso do NVM
- Para listar todas as versões disponíveis do Node.js:
  ```bash
  nvm list available
  ```

- Para instalar uma versão específica do Node.js: (Usaremos a versão 16)
  ```bash
  nvm install 16
  ```

- Para definir a versão do Node.js a ser usada em um diretório específico:
  ```bash
  nvm use 16
  ```

- Para definir uma versão padrão do Node.js para todos os projetos:
  ```bash
  nvm alias default 16
  ```

## Fundamentos do Node.js:

### 1. Módulos
O Node.js usa o sistema de módulos CommonJS. Cada arquivo é tratado como um módulo por padrão.

Exemplo de como exportar e importar módulos:

```javascript
// arquivo modulo.js
module.exports = {
  mensagem: 'Olá mundo!',
  saudacao: function() {
    console.log(this.mensagem);
  }
};
```

```javascript
// arquivo principal.js
const modulo = require('./modulo.js');
modulo.saudacao(); // Output: Olá mundo!
```

### 2. Gerenciador de Pacotes npm
O npm (Node Package Manager) é o gerenciador de pacotes padrão para o Node.js. Ele permite instalar e gerenciar dependências de projetos Node.js.

Exemplo de uso do npm:

```bash
npm init
# Ao seguir poucos passos, um projeto em node será iniciado.
```
O arquivo package.json será automaticamente criado.
```json
{
  "name": "pratica-0",
  "version": "1.0.0",
  "description": "Projeto de exemplo para o C216-L1",
  "main": "index.js",
  "scripts": {
    "test": "Não há testes configurados"
  },
  "author": "Lucas GES134",
  "license": "ISC"
}
```
Para instalar dependências utilizamos:
```bash
npm install [dependency-name]
# Exemplo da instalação do restify
npm install restify --save
```
A dependêcia será instalada e adicionada ao package.json
### 3. Operações de I/O Assíncronas
O Node.js é conhecido por sua capacidade de realizar operações de I/O de forma assíncrona e não bloqueante, o que o torna eficiente para aplicativos que lidam com muitas operações de I/O.

Exemplo de operação de I/O assíncrona:

```javascript
const fs = require('fs');

fs.readFile('arquivo.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 4. HTTP e restify
O Node.js permite criar servidores HTTP facilmente. O restify.js é um framework web para Node.js que simplifica o processo de criação de aplicativos web.

Exemplo de uso do Restify.js:

```javascript
var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
```

### Exemplo de Utilização de Biblioteca para MySQL (mysql2)

Instale a biblioteca mysql2 usando o npm:

```bash
npm install mysql2
```

Exemplo de conexão e consulta a um banco de dados MySQL:

```javascript
const mysql = require('mysql2/promise');

// Configurações de conexão
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'nome_do_banco'
});

// Consulta a tabela 'users'
const [rows, fields] = await connection.execute('SELECT * FROM users');

console.log(rows); // Resultado da consulta
```

### Exemplo de Utilização de Biblioteca para PostgreSQL (pg)

Instale a biblioteca pg usando o npm:

```bash
npm install pg
```

Exemplo de conexão e consulta a um banco de dados PostgreSQL:

```javascript
const { Client } = require('pg');

// Configurações de conexão
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'nome_do_banco',
  password: 'senha',
  port: 5432,
});

// Conectar ao banco de dados
client.connect();

// Consulta a tabela 'users'
const result = await client.query('SELECT * FROM users');

console.log(result.rows); // Resultado da consulta

// Encerrar a conexão
client.end();
```

Esses são exemplos básicos de como você pode utilizar as bibliotecas `mysql2` para MySQL e `pg` para PostgreSQL em JavaScript para realizar consultas e interagir com bancos de dados. Certifique-se de substituir as informações de conexão (como host, usuário, senha, etc.) pelos valores corretos para o seu ambiente.

---
[Voltar ao início](../../README.md)