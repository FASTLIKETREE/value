
const options = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'value'
  }
}


const knex = require('knex')(options)


async function connect() {
  console.log('dog')
  await knex.schema.createTable('dog', (table) => {
    table.increments()
    table.string('myname')
    console.log('dog')

  })

}

connect()