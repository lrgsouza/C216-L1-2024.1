# Parte 3: Exercício Proposto para introdução ao js e node.js

## 1 - Criar o repositorio no GitHub
Usar o padrão abaixo para criar o repositório
```
S216-L1-[SUA-MATRICULA] exemplo: S216-L1-GES134
```
Podem usar meu repositorio como exemplo.

## 2 - Clonar o repositório no seu computador
```
git clone https://github.com/[SEU-USERNAME]/S216-L1-[SUA-MATRICULA].git
```
## 3 - Instalar o Nvm no seu computador e com o nvm instalar o node 16
[Documentação](./node.md)

## 4 - Criar a subpasta pratica-0 no repositório clonado e abri-la no terminal do vscode
```
./pratica-0
```

## 5 - Utilizar o npm init para criar o projeto "pratica-0"
```
nvm use 16
npm init
```
Seguir os passos do npm init. (os passos não listados podem ser ignorados, pesse-os com ENTER)
- package name: pratica-0
- package description: Projeto de exemplo para o C216-L1
- package test command: Não há testes configurados
- package author: [Seu nome] [Sua Matricula]

## 6 - Criar a subpasta src com os arquivos index.js e module.js 
Os codigos abaixo são exemplos, voce pode criar outros se quiser, o unico requisito é que contenham seu nome e sua matricula nos outputs.
## 7 - Utilizando os conceitos de JS e Node.js, adicionar o seguinte código no index.js:
```javascript
// Exemplo de uso prático
let nome = "[SEU NOME] - [SUA MATRICULA]";
function saudacaoPersonalizada(nome) {
    console.log("Olá, " + nome + "!");
}
saudacaoPersonalizada(nome);

let modulo = require('./module.js');
modulo.saudacao();
```
## 8 - Adicionar o seguinte código no module.js:
```javascript
// arquivo modulo.js
module.exports = {
    mensagem: 'Testando modulo: [SEU NOME] - [SUA MATRICULA] !',
    saudacao: function() {
      console.log(this.mensagem);
    }
  };
```
## 9 - Executar o index.js
```bash
node src/index.js
```

## 10 - Verificar o resultado no terminal, tirar um print e colocar na pasta img
```bash
./img/pratica-0.png
```


## OBS: Adicione o arquivo .gitignore na raiz do projeto para ignorar a pasta node_modules
```txt
# Dependências do NodeJS
node_modules/
```
[Voltar ao início](../README.md)