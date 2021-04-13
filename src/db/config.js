const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
// o JS permite usando chaves, pegar só uma funcionaliade do objeto chamado


//arrow function -> 
// um uso por exemplo, para dizer que é uma funcção e não um objeto
// no caso do open, precisa estar dentro de uma estrutura de função não de um objeto

module.exports = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

