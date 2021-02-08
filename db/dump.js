const fs = require('fs')
const execSync = require('child_process').execSync

const dumpFile = 'valueDump.sql'
const dumpArchive = 'valueDump.gz'

async function createDump() {
  const dumpCommand = `mysqldump -u root --no-create-info --no-create-db ${database} > ${dumpFile}`
  const archiveCommand = `tar -cvzf ${dumpArchive} ${dumpFile} > /dev/null 2>&1`

  console.log(dumpCommand)
  execSync(dumpCommand)
  console.log(archiveCommand)
  execSync(archiveCommand)
}

async function restoreDump() {
  const unarchiveCommand = `tar -xvzf ${dumpArchive} > /dev/null 2>&1`
  const restoreCommand = `mysql -u root ${database} < ${dumpFile}`
  if (fs.existsSync(`${dumpArchive}`)) {
    console.log(unarchiveCommand)
    execSync(unarchiveCommand)
    console.log(restoreCommand)
    execSync(restoreCommand)
  }
}

async function dumpTable(database, tableName) {
  const dumpCommand = `mysqldump -u root ${database} ${tableName} > ${tableName}.sql`
  const archiveCommand = `tar -cvzf ${dumpArchive} ${dumpFile} > /dev/null 2>&1`

  console.log(dumpCommand)
  execSync(dumpCommand)
  console.log(archiveCommand)
  execSync(archiveCommand)
}

async function restoreTableDump(database, tableName) {
  const restoreCommand = `mysql -u root ${database} < ${tableName}.sql`
  console.log(restoreCommand)
  execSync(restoreCommand)
}

dumpTable('value', '20')

module.exports.createDump = createDump
module.exports.restoreDump = restoreDump
module.exports.dumpTable = dumpTable
module.exports.restoreTableDump = restoreTableDump