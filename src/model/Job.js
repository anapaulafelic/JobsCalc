//model é o responsável por ejetar os dados
//model altera os dados
//o controller não
const Database = require('../db/config');

module.exports = {
  async get() {
   const db = await Database()

   const jobs =  await db.all(`SELECT * FROM jobs`)

    await db.close()
    // quando não estamos fazendo mais nada, conta, ou if,
    // não é preciso usar o return
    //então podemos envolver as chaves depois da seta em parenteses
    // return jobs.map(job => {
    //   return { <<< esse 2º return é dispensado usamos o =>({})
    return jobs.map(job => ({
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at
    }))
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    await db.run(`UPDATE jobs SET 
    name = "${updatedJob.name}",
    daily_hours = ${updatedJob["daily-hours"]},
    total_hours =  ${updatedJob["total-hours"]} 
    WHERE id = ${Number(jobId)}
    `)
    await db.close()
  },

  async delete(id) {
    const db = await Database()

   await db.run(`DELETE FROM jobs WHERE id=${Number(id)}`)
   await db.close()
  },

  async create(newJob) {
    const db = await Database()
    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newJob.name}",
       ${newJob["daily-hours"]},
       ${newJob["total-hours"]},
       ${newJob.created_at}
    )`)
    await db.close()
  }
}