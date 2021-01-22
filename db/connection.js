const knexLib = require('knex')

const user = 'root'
const password = ''
const database = 'value'
const host = '127.0.0.1'

let knex
async function getConnection(host = '127.0.0.1', user = 'root', password = '', database = 'value') {
  console.log('wtf!')
  console.log(user)
  const connection = {
    host,
    user,
    password,
    database,
    multipleStatements: true
  }

  if (knex) { 
    return knex 
  } else {
    console.log(`instantiating connection: ${JSON.stringify(connection)}`)
    try {
      knex = await knexLib({
        client: 'mysql',
        connection
      })
    } catch (err) {
      console.log(err)
    }

    // knex.on('query', function(obj) {
    //   console.log(`${getSqlString(obj.sql, obj.bindings)}`)
    // })
    //
    // knex.on('query-error', function(error, obj) {
    //   console.log(`${getSqlString(obj.sql, obj.bindings)}`)
    // })

    return knex
  }
}

function getSqlString(sql, bindings) {
  if (bindings) {
    for (const binding of bindings) {
      sql = sql.replace('?', binding)
    }
  }
  return sql.replace(' and where 1 = 1', '').replace(' and 1 = 1', '').replace(' where 1 = 1', '')
}

module.exports.user = user
module.exports.database = database
module.exports.host = host
module.exports.password = password 
module.exports.getConnection = getConnection
