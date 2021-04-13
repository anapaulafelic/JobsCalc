const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() })
  },

  async update(req, res) {
    //req.body para pegar dados
    const data = req.body

    //definir qutas semanas tem um ano
    const weeksPerYear = 52
    
    //remover as férias do ano
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
    
    //quantas horas por seman vou trabalhar
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    
    //horas trabalhadas  no mes
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    //qual será  valor da minha hora
    const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours
    
  const profile = await Profile.get()

  await Profile.update({
      ... profile,
      ...req.body,
      "value-hour": valueHour
     })
    return res.redirect('/profile')
  }
}