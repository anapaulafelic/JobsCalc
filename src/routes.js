const express = require("express");
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController');
const DashboardController = require("./controllers/DashboardController");

//const basePath = __dirname + "/views";
//o basePath já é padrão no EJS, então vamos desabilitar

//quando usamos __dirname pega a pasta que arq está
//neste caso src/views
//const views = __dirname + "/views/";  >>> foi para o server como server.set

routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

//quando o nome do parametro é o mesmo do objeto, posso omitir o parametro. >>> res.render(views + "profile", { profile: profile }) FICA >>>>>>res.render(views + "profile", { profile })

module.exports = routes;
