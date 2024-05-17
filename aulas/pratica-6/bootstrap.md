# Usando Bootstrap para estilizar HTMLs

O Bootstrap é um framework front-end para desenvolvimento web, que facilita a criação de interfaces de usuário responsivas e acessíveis.

## Instalação

Podemos instalar o Bootstrap diretamente no HTML adicionando as seguintes linhas de código, no head e no body, respectivamente:

### Adicionando CSS
```html
    <head>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
```

### Adicionando JavaScript 
```html
    <body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </body>
```

### Adicionando Navbar
```html
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
            <a class="navbar-brand" href="/">Gerenciamento de Alunos</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
                <a class="nav-link" href="/inserir">Inserir Aluno</a>
                <a class="nav-link" href="/listar">Listar Alunos</a>
                <a class="nav-link" href="/reset-database">Resetar o database</a>
                </div>
            </div>
            </div>
        </nav>
```

### Usando bootstrap

Após adicionar a estilização do Bootstrap, podemos usar o Bootstrap dentro do HTML, adicionando classes específicas do Bootstrap aos elementos HTML.

```html
    <div class="container">
        <h1>Olá, mundo!</h1>
    </div>
```

### Link para documentação do Bootstrap

[Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)


### Exercício Proposto

Agora que o Bootstrap foi instalado e o HTML estilizado, podemos fazer o exercício de estilização do Bootstrap.

1. Estilizar o frontend do projeto.
2. Rodar os mesmos testes da pratica-5 (home, inserir, listar vazio, listar, atualizar).
3. Subir os resultados na pasta pratica-6/img.

---
[voltar ao início](../../README.md)