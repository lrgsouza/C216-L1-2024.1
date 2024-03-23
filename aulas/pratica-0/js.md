# Parte 1: JavaScript (JS)

## O que é JavaScript?
JavaScript é uma linguagem de programação de alto nível, interpretada e orientada a objetos. É amplamente utilizada para criar interatividade em páginas web, mas também pode ser usada em servidores, dispositivos IoT e muito mais.

## Fundamentos do JavaScript:

### 1. Variáveis e Tipos de Dados:
```javascript
// Exemplos de declaração de variáveis
var nome = "João";
let idade = 25;
const PI = 3.14;

// Tipos de dados
let numero = 10;
let texto = "Olá, mundo!";
let booleano = true;
let array = [1, 2, 3];
let objeto = { chave: "valor" };
```

### 2. Operadores:
```javascript
// Operadores aritméticos
let soma = 10 + 5;
let subtracao = 10 - 5;
let multiplicacao = 10 * 5;
let divisao = 10 / 5;
let modulo = 10 % 3;

// Operadores de comparação
let igualdade = 10 == 5; // false
let desigualdade = 10 != 5; // true
let maior = 10 > 5; // true
let menor = 10 < 5; // false

// Operadores lógicos
let eLogico = true && false; // false
let ouLogico = true || false; // true
let negacao = !true; // false
```

### 3. Estruturas de Controle:
```javascript
// Estrutura if/else
let idade = 18;
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Estrutura switch
let dia = "segunda";
switch (dia) {
    case "segunda":
        console.log("Dia de trabalhar");
        break;
    case "sábado":
    case "domingo":
        console.log("Dia de descansar");
        break;
    default:
        console.log("Dia da semana");
}

// Estrutura de loop (for)
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Estrutura de loop (while)
let contador = 0;
while (contador < 5) {
    console.log(contador);
    contador++;
}
```

### 4. Funções:
```javascript
// Declaração de função
function saudacao(nome) {
    console.log("Olá, " + nome + "!");
}

// Chamando a função
saudacao("Maria");

// Função com retorno
function soma(a, b) {
    return a + b;
}

let resultado = soma(3, 5);
console.log(resultado);
```

### 5. Objetos e Arrays:
```javascript
// Array
let frutas = ["maçã", "banana", "laranja"];
console.log(frutas[0]); // maçã

// Objeto
let pessoa = {
    nome: "João",
    idade: 30,
    cidade: "São Paulo"
};
console.log(pessoa.nome); // João
```

### 6. Escopo e Closure:
```javascript
// Escopo global
let mensagem = "Olá";
function saudacao() {
    console.log(mensagem);
}
saudacao(); // Olá

// Escopo local
function saudacaoLocal() {
    let mensagemLocal = "Oi";
    console.log(mensagemLocal);
}
saudacaoLocal(); // Oi
// console.log(mensagemLocal); // Erro: mensagemLocal is not defined

// Closure
function saudacaoClosure() {
    let mensagemClosure = "Olá";
    function saudar() {
        console.log(mensagemClosure);
    }
    return saudar;
}
let saudar = saudacaoClosure();
saudar(); // Olá
```

## Demonstração Prática:
```javascript
// Exemplo de uso prático
let nome = "Ana";
function saudacaoPersonalizada(nome) {
    console.log("Olá, " + nome + "!");
}
saudacaoPersonalizada(nome);
```

---
[Voltar ao início](../../README.md)