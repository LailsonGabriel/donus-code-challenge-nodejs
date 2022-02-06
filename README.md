# donus-code-challenge

# Primeiros passos
<ol>
  <li>Clone essse repositório <strong>git clone git@github.com:LailsonGabriel/donus-code-challenge.git</strong></li>
  <li>Instale as dependências <strong>npm install</strong></li>
  <li>Crie um arquivo .env **Na pasta raíz**</strong></li>
  **Atenção preencha os campo MYSQL_USER, MYSQL_PASS, MYSQL_LOCAL de acordo com o seu user do MYSQL
  **Como exemplo abaixo:
</ol>


![Exemplo](https://github.com/LailsonGabriel/donus-code-challenge/blob/main/env-example.png)

Você também pode utilizar o Docker:

<p>Para finalizar as tarefas do MySQL em sua máquina:</p>
<strong>sudo systemctl stop mysql</strong>
<p>E depois:</p>
<strong>docker container run --name donus-code-mysql -e MYSQL_ROOT_PASSWORD=donus-code -d -p 3306:3306 mysql:5</strong>
<p>Para rodar o Mysql em um container Docker</p>

<p>E o seu .env deve ficar assim:</p>

![Exemplo](https://github.com/LailsonGabriel/donus-code-challenge/blob/main/Screenshot%20from%202022-02-06%2014-52-09.png)



# Rodar os testes de integração
Para rodar os testes execute o seguinte comando em seu terminal: <strong>npm test<strong> <p>Obs: para rodar os testes é muito importante que já tenha configurado o arquivo .env<p>
<p>Esse comando vai criar a tabela em seu MySQL e vai popular ela através do Sequelize</p>
  
  
  
<h1>Rodar aplicação</h1>
Para rodar a aplicação execute o seguinte comando em seu terminal: <strong>npm start<strong>
<p>Esse comando vai criar a tabela em seu MySQL, vai popular ela através do Sequelize e iniciar o Nodemon</p>
  
  
<h1>Rotas da Aplicação</h1>
<h3>Method: POST /user | Criar um usuário</h3>
<p>a estrutura do body deve ser semelhante a essa</p>
  
  
```json
{
  fullName: "Nome Exemplo",
  cpf: "45698045777"
}
```

<h3>Method: PUT /user/:cpf | Deposita dinheiro na conta do usuário passado na rota através do CPF</h3>
<p>a estrutura do body deve ser semelhante a essa</p>
  

```json
{
  amount: 1500
}
```
  
<h3>Method: GET /user/:cpf | Verifica a conta do usuário através do CPF</h3>
<p>a resposta deve ser semelhante a essa</p>
  

```json
{
  id: 1,
  fullName: "Nome Exemplo",
  cpf: "45698045777"
  bank: 1500
}
```
  

  
<h1>Oque foi usado Oque foi usado na realização do projeto??</h1>
  <ul>
    <li>NodeJS</li>
    <li>Sequelize</li>
    <li>Express</li>
    <li>Express-rescue</li>
    <li>Mysql2 (para conexão com banco de dados)</li>
    <li>Nodemon</li>
  </ul>
    <h4>Testes:</h4>
    <ul>
      <li>Mocha</li>
      <li>Chai</li>
      <li>Chai-http</li>
      <li>Sinon</li>
    </ul>
