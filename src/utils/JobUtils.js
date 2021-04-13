module.exports = {
  remainingDays(job) {
      //calculo do tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
      //toFixed para arredondar número. A função tb transforma em uma strimg
    
      const createdDate = new Date(job.created_at)
      //está pegando a data original em milisegundos e transforma em uma data de quando ele foi criado
      const dueDay = createdDate.getDate() + Number(remainingDays)
      //aqui ele só dá o dia, em dias mesmo 
      //>> retorna um número de dias >> getDate
      const dueDateInMs = createdDate.setDate(dueDay)
      //aqui ele vai dar a data exata do vencimento em milisegundos
      // >>setDate
    
      const timeDiffInMs = dueDateInMs - Date.now()
      //transformar millisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24
      // milliseconds * segundos * minutos * horas/dia
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
      //math.floor - arredondad para baixo
      //Math.ceil - arredonda para cima
      //restam xx dias
      return dayDiff
    },
    calculateBudget:(job, valueHour) => valueHour * job["total-hours"]
}