const Database = require('../db/config')


  module.exports = {
   async get() {
      const db = await Database()
      //o get só traz 01, um retorno, um registro
      const data = await db.get(`SELECt * FROM profile`)
      db.close()      
      
      return {
        //normalização
        name: data.name,
        avatar: data.avatar,
        "monthly-budget": data.monthly_budget,
        "days-per-week": data.days_per_week,
        "hours-per-day": data.hours_per_day,
        "vacation-per-year": data.vacation_per_year,
        "value-hour": data.value_hour
      };
    },

   async update(updateData){
    const db = await Database()

    db.run(`UPDATE profile SET 
    name = "${updateData.name}",
    avatar = "${updateData.avatar}",
    monthly_budget = ${updateData["monthly-budget"]},
    days_per_week = ${updateData["days-per-week"]},
    hours_per_day = ${updateData["hours-per-day"]},
    vacation_per_year = ${updateData["vacation-per-year"]},
    value_hour = ${updateData["value-hour"]}
    `)
    await db.close()
    }
  }