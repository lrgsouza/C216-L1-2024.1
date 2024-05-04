from flask import Flask, render_template, request, redirect, url_for, jsonify
import requests
import os

app = Flask(__name__)

# Definindo as variáveis de ambiente
API_BASE_URL = os.getenv("API_BASE_URL" , "http://localhost:5000/api/v1/aluno")
API_DATABASE_RESET = os.getenv("API_DATABASE_RESET" , "http://localhost:5000/api/v1/database/reset") 

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para exibir o formulário de cadastro
@app.route('/inserir', methods=['GET'])
def inserir_aluno_form():
    return render_template('inserir.html')

# Rota para enviar os dados do formulário de cadastro para a API
@app.route('/inserir', methods=['POST'])
def inserir_aluno():
    nome = request.form['nome']
    curso = request.form['curso']
    data_nascimento = request.form['data_nascimento']

    payload = {
        'nome': nome,
        'curso': curso,
        'dataNascimento': data_nascimento
    }

    response = requests.post(f'{API_BASE_URL}/inserir', json=payload)
    
    if response.status_code == 201:
        return redirect(url_for('listar_alunos'))
    else:
        return "Erro ao inserir aluno", 500

# Rota para listar todos os alunos
@app.route('/listar', methods=['GET'])
def listar_alunos():
    response = requests.get(f'{API_BASE_URL}/listar')
    alunos = response.json()
    return render_template('listar.html', alunos=alunos)

# Rota para exibir o formulário de edição de aluno
@app.route('/atualizar/<int:aluno_id>', methods=['GET'])
def atualizar_aluno_form(aluno_id):
    response = requests.get(f"{API_BASE_URL}/listar")
    #filtrando apenas o aluno correspondente ao ID
    alunos = [aluno for aluno in response.json() if aluno['id'] == aluno_id]
    if len(alunos) == 0:
        return "Aluno não encontrado", 404
    aluno = alunos[0]
    return render_template('atualizar.html', aluno=aluno)

# Rota para enviar os dados do formulário de edição de aluno para a API
@app.route('/atualizar/<int:aluno_id>', methods=['POST'])
def atualizar_aluno(aluno_id):
    nome = request.form['nome']
    curso = request.form['curso']
    data_nascimento = request.form['data_nascimento']

    payload = {
        'id': aluno_id,
        'nome': nome,
        'curso': curso,
        'dataNascimento': data_nascimento
    }

    response = requests.post(f"{API_BASE_URL}/atualizar", json=payload)
    
    if response.status_code == 200:
        return redirect(url_for('listar_alunos'))
    else:
        return "Erro ao atualizar aluno", 500

# Rota para excluir um aluno
@app.route('/excluir/<int:aluno_id>', methods=['POST'])
def excluir_aluno(aluno_id):
    #payload = {'id': aluno_id}
    payload = {'id': aluno_id}

    response = requests.post(f"{API_BASE_URL}/excluir", json=payload)
    
    if response.status_code == 200  :
        return redirect(url_for('listar_alunos'))
    else:
        return "Erro ao excluir aluno", 500

#Rota para resetar o database
@app.route('/reset-database', methods=['GET'])
def resetar_database():
    response = requests.delete(API_DATABASE_RESET)
    
    if response.status_code == 200  :
        return redirect(url_for('index'))
    else:
        return "Erro ao resetar o database", 500


if __name__ == '__main__':
    app.run(debug=True, port=3000, host='0.0.0.0')
