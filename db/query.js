async function querySubByAdsh(knex, adsh) {
  const results = await knex('sub').where({ adsh })
  // console.log(results)
  return results
}

async function queryPreByAdsh(knex, adsh) {
  const results = await knex('pre').where({ adsh })
  // console.log(results)
  return results
}

async function queryNumByAdsh(knex, adsh) {
  const results = await knex('num').where({ adsh })
  // console.log(results)
  return results
}

module.exports.querySubByAdsh = querySubByAdsh
module.exports.queryPreByAdsh = queryPreByAdsh
module.exports.queryNumByAdsh = queryNumByAdsh
