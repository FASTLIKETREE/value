const execSync = require('child_process').execSync
const fs = require('fs')
const glob = require('glob')

const dataFolder = './data'
const tableSuffixs = [
  'subs',
  'tags',
  'nums',
  'pres'
]

function getQuarterlyDataFolderNames() {
  const dataDir = fs.readdirSync(dataFolder)
  const dirNames = dataDir.filter(file => fs.lstatSync(`${dataFolder}/${file}`).isDirectory())
  console.log(dirNames)
  return dirNames
}

function genTables() {
  const tableSql = fs.readFileSync('./db/value.sql', 'utf-8')
  const dirNames = getQuarterlyDataFolderNames()

  for (const dirName of dirNames) {
    let tableSqlYear = tableSql
    for (const tableSuffix of tableSuffixs) {
      const re = new RegExp(tableSuffix, "g")
      tableSqlYear = tableSqlYear.replace(re, `${dirName}_${tableSuffix}`)
      console.log(tableSuffix)
    }
    console.log(dirName)
    fs.writeFileSync(`./db/${dirName}.sql`, tableSqlYear)
  }
}

function restoreSchema() {
  genTables()
  const schemaFiles = glob.sync('./db/*.sql')
  console.log(schemaFiles)
  for (const schemaFile of schemaFiles) {
    const schemaCommand = `mysql -u root < ${schemaFile}`
    console.log(schemaCommand)
    execSync(schemaCommand)
  }
}

module.exports.getQuarterlyDataFolderNames = getQuarterlyDataFolderNames
module.exports.genTables = genTables
module.exports.restoreSchema = restoreSchema