// o require("express") atribui uma função a constante express. O Require no javascript, é uma forma de chamar uma função nativa. Require + o atributo, a função que você quer chamar/usar.
const express = require("express");
const server = express();
//server -> oq faz o servidor
const routes = require("./routes");
const path = require("path");

//oh server, nosso front será em ejs, nossas view engine, ele entende
//todos os arquivos em ejs estarão em uma pasta ejs  ok?
server.set("view engine", "ejs");

//mudar a localização da pasta views
server.set('views', path.join(__dirname,'views'))


//habilitar arquivos estáticos
server.use(express.static("public"));

//usar o req.body === uso do urlencode
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes);

//listen liga o servidor
server.listen(3000, () => console.log("rodando"));
