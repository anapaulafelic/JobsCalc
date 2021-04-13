const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
const Job = require('../model/Job')

module.exports = {
  async index(req, res) {
   const jobs = await Job.get();
   const profile = await Profile.get();

   let statusCount = {
     progress: 0,
     done: 0,
     total: jobs.length
   }
   //variável com letra minúscula
   //total de horas por dia dos jobs em progresso
   let jobTotalHours = 0;

    const updatesJobs = jobs.map((job) => {
    //ajustes no job
    const remaining = JobUtils.remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress' //if ternário
    
    //somando  a quantidade de status
    //pega em statusCount[status(done ou progress ... ver acima o status)]
    // oque for igual a ['done'] e soma + 1 etc
    //+= >>> a = a+1 ou a += 1
    statusCount[status] += 1;
     //total de horas por dia dos jobs em progresso
    //if(status == 'progress') {
    //  jobTotalHours += Number(job['daily-hours']);
    //}
    // refatoração da linha de cima em ternário. Pode ser assim ou cokmo acima
    jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

    return {
    //espalhamento em novo objeto = estrade
    ...job,
      remaining,
      status,
      budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    });

    // qtd de horas/dia que quero trabalhar
    //MENOS
    //a qtd de horas por dia que quero tabalhar
    const freeHours = (profile["hours-per-day"] - jobTotalHours);
    return res.render("index", { jobs: updatesJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    //o que estou passando para a página que vai usar esse controler? jobs e profile
    //o jobs dessa parte é só um objeto que estou usando para passar para o EJS index
  }
}
