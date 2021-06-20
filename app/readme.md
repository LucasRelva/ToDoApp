
> App para organização de tarefas -- HTML e CSS copiados do app: https://todomvc.com/
> RESTful API, Back-end e JS no client-side originais. AUTHOR: Lucas Relva
> APP feito para o desafio técnico da empresa Bright Cities

# Tech
  - HTML, JS
  - Node;
  - Sequelize
  - MySQL;

# Dependências e suas versões

  - NodeJs : 10.19.0
  - Express: ^4.17.1
  - Mysql2: ^2.2.5
  - Sequelize: ^6.6.2
  - dotenv: ^10.0.0
  - Nodemon: ^2.0.7
  - Sequelize-cli: ^6.2.0
  - Axios: ^0.21.1
  - Cors: ^2.8.5

# Comandos que fazem tudo funcionar

  - npm run dev || yarn dev                                   
    - Abre o servidor em localhost
  - npx sequelize db:create || yarn sequelize db:create       
    - Cria o banco de dados especificado no arquivo .sequelizerc
  - npx sequelize db:migrate || yarn sequelize db:migrate     
    - Executa as *migrations* pendentes

# Routes 
   - Collection do insomnia pode ser encontrada na pasta assets na raiz do projeto
   
- [x] Atualizar nome | PUT /task/name/:taskID
- [x] Atualizar status de todas as tasks | PUT /task 
- [x] Atualizar status de uma task | PUT /task/:taskID
- [x] Criar task | POST /task
- [x] Limpar tasks completadas | DELETE /task
- [x] Excluir task | DELETE /task/:taskId
- [x] Verificar se existem tasks completadas | GET /task/check (Retorna true se existir e false se não)
- [x] Listar tasks completadas  | GET /task/completed
- [x] Listar tasks ativas  | GET /task/active
- [x] Listar todas as tasks | GET /task

# Links
  - [ToDo MVC](https://todomvc.com/examples/vanillajs/#/1)

# Informações pessoais
 - Lucas
    - [GitHub](https://github.com/LucasRelva) 
    - [Linkedin](https://www.linkedin.com/in/lucasrelva/)
  