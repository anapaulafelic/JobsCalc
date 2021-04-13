// O INIT é rodados só uma vez no projeto, para
//criar as tabelas e banco e só

const Database = require('./config');
// o nome poderia ser Config, mas escolhemos DATABASE para ficar makis bonitinho ;)

//uma constante que tem um objeto dentro
const initDb = {
  async init(){
    
//sempre que usar o await, o conteúdo precisa estar dentro
//de uma estrutura de função async
//abriu a conexão com o banco/abertura da porta
//await --- JS, espere o banco de dados abrir a porta
//antes de seguir para a próximo comando
//criamos uma variável para armazenar o retorno do comando open
const db = await Database()

//sql INTEGER e INT são a mesma coisa
await db.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT, 
  monthly_budget INT,
  days_per_week INT,
  hours_per_day INT,
  vacation_per_year INT,
  value_hour INT
  )`);

  await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT, 
    total_hours INT,
    created_at DATETIME
    )`);

    //digo para o BD -->>> rode esse comando ... 
    await db.run(`
    INSERT INTO profile (
        name,
        avatar, 
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
        ) VALUES (
          "Ana Paula",
          "https://avatars.githubusercontent.com/u/54913406?v=4",
          4000,
          5,
          7,
          10,
          60
        );`)

 await db.run(`
  INSERT INTO jobs (
    name,
    daily_hours, 
    total_hours,
    created_at
  ) VALUES (
    "Pizzaria Qiqy",
    2,
    10,
    161754376018
  );`)

  await db.run(`
  INSERT INTO jobs (
    name,
    daily_hours, 
    total_hours,
    created_at
  ) VALUES (
    "OneTwo Project",
    1,
    13,
    161754376018
  );`)

  

  await db.close()
  //Date.now()
  //gera um número ex: 161754376018

 }}

 initDb.init()