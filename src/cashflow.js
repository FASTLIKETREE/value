const connection = require('../db/connection')

quarters = ['q1', 'q2', 'q3', 'q4']
async function getCashFlow(adsh, year) {
  const cnx = await connection.getConnection()

}

async function getSubsByYear(cik, year) {
  const quarter = 'q1'
  const knex = await connection.getConnection()
  const q1 = await knex.raw(`select adsh, form from ${year}q1_subs where cik = '${cik}'`)
  const q2 = await knex.raw(`select adsh, form from ${year}q2_subs where cik = '${cik}'`)
  const q3 = await knex.raw(`select adsh, form from ${year}q3_subs where cik = '${cik}'`)
  const q4 = await knex.raw(`select adsh, form from ${year}q4_subs where cik = '${cik}'`)
  const subs = await Promise.all([q1[0],q2[0],q3[0],q4[0]])
  console.log(subs)
  await knex.destroy()
}

getSubsByYear('1591763', '2019')


