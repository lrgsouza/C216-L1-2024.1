# Pratica 5 - Frontend com Flask

Este é um exemplo básico de como criar um frontend usando Flask, um framework web em Python.

## O que é Flask?

Flask é um microframework web em Python que permite criar aplicativos web de forma rápida e simples. Ele fornece ferramentas para roteamento, renderização de templates, gerenciamento de sessões e muito mais, tudo isso com uma sintaxe limpa e fácil de entender.

## Funcionamento básico

Em um aplicativo web Flask, o frontend geralmente consiste em páginas HTML, CSS e JavaScript que são servidas pelo Flask e exibidas no navegador do usuário. O Flask funciona como um servidor web que responde a solicitações HTTP, como GET e POST, e retorna as páginas HTML correspondentes.

## Estrutura básica de um aplicativo Flask

Um aplicativo Flask geralmente tem a seguinte estrutura de arquivos:

```
meu_app/
    |- app.py
    |- templates/
        |- index.html
    |- static/
        |- style.css
```

- **`app.py`**: Este é o arquivo principal do aplicativo Flask. Ele contém o código Python que define as rotas, manipula as solicitações do cliente e renderiza os templates HTML.

- **`templates/`**: Esta pasta contém os templates HTML usados para renderizar as páginas web. Flask usa o mecanismo Jinja2 para renderização de templates.

- **`static/`**: Esta pasta contém arquivos estáticos como CSS, JavaScript e imagens que são usados para estilizar e interagir com as páginas HTML.

## Exemplo básico

Aqui está um exemplo básico de como criar um frontend usando Flask:

1. **Definir rotas**: No arquivo `app.py`, definimos rotas para diferentes URLs que nosso aplicativo irá lidar. Por exemplo, `/` para a página inicial, `/about` para a página "Sobre nós", etc.

2. **Renderizar templates**: Usamos o mecanismo de templates Jinja2 para renderizar os templates HTML dentro das rotas. Podemos passar dados dinâmicos para os templates usando variáveis.

3. **Servir arquivos estáticos**: Se quisermos usar CSS, JavaScript ou imagens em nossas páginas, colocamos esses arquivos na pasta `static/` e Flask irá servi-los automaticamente.

4. **Interagir com o frontend**: Podemos criar formulários HTML para que os usuários insiram dados, e usar JavaScript para fazer solicitações AJAX para o backend Flask sem recarregar a página.

## Executando o aplicativo

Para executar o aplicativo Flask, você precisa instalar o Flask primeiro:

```
pip install Flask
```

Em seguida, execute o arquivo `app.py`:

```
python app.py
```

O aplicativo será executado em `http://localhost:3000` por padrão. Você pode acessá-lo em seu navegador.

## Exercício proposto

Faça a adaptação do frontend de alunos para professores. Execute o projeto com docker-compose, tire prints de cada passo sinalizado abaixo e salve os prints na pasta img da pratica 5.

### Passos
1. Página inicial (print)
2. Inserir 2 ou mais professores
4. Listar professores (print)
5. Editar um professor
6. Listar professores (print)
7. Deletar um professor
8. Listar professores (print)
9. Resetar o database
10. Listar professores (print)



## Observações

Se atentar as alterações no docker-compose.yml. O frontend deve ser servido na porta 3000, e o backend na porta 5000.

---
[voltar ao início](../../README.md)