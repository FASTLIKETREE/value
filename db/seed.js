const execSync = require('child_process').execSync
const glob = require('glob')
const fs = require('fs')

const txtPath = './data/2020q3'

const dumpFile = 'valueDump.sql'
const dumpArchive = 'valueDump.gz'
const database = 'value'

function genTables() {
  const dataFolder = './data'
  const dataDir = fs.readdirSync(dataFolder)
  const tableSql = fs.readFileSync('./db/value.sql', 'utf-8')
  const dirNames = dataDir.filter(file => fs.lstatSync(`${dataFolder}/${file}`).isDirectory())
  console.log(dirNames)

  const tableNames = [
    'subs',
    'tags',
    'nums',
    'pres'
  ]

  for (const dirName of dirNames) {
    let tableSqlYear = tableSql
    for (const tableName of tableNames) {
      const re = new RegExp(tableName, "g")
      tableSqlYear = tableSqlYear.replace(re, `${dirName}_${tableName}`)
      console.log(tableName)
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

restoreSchema()

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

// Set numRecords to undefined to seed all records
const seedDb = [
  {
    seed: false,
    headers : ['adsh','cik','name','sic','countryba','stprba','cityba','zipba','bas1','bas2',
      'baph','countryma','stprma','cityma','zipma','mas1','mas2','countryinc','stprinc','ein',
      'former','changed','afs','wksi','fye','form','period','fy','fp','filed','accepted','prevrpt','detail','instance','nciks','aciks'],
    fileName: 'sub.txt',
    tableName: 'sub',
    numRecords: undefined
  }, {
    seed: true,
    headers : ['tag','version','custom','abstract','datatype','iord','crdr','tlabel','doc'],
    fileName: 'tag.txt',
    tableName: 'tag',
    numRecords: undefined
  }, {
    seed: false,
    headers : ['adsh', 'tag', 'version', 'coreg', 'ddate', 'qtrs', 'uom', 'value', 'footnote'],
    fileName: 'num.txt',
    tableName: 'num',
    numRecords: undefined
  }, {
    seed: false,
    headers : ['adsh','report','line','stmt','inpth','rfile','tag','version','plabel','negating'],
    fileName: 'pre.txt',
    tableName: 'pre',
    numRecords: undefined
  }
]

async function seedRecords(knex) {
  for (const seedData of seedDb) {
    // if (seedData.seed === false) { continue }
    const file = fs.readFileSync( `${txtPath}/${seedData.fileName}`, 'utf-8')
    const splitText = file.split('\n')

    let records = []
    const recordLimit = seedData.numRecords ? seedData.numRecords : splitText.length - 2
    for (let i = 1; i <= recordLimit; ++i) {
      const splitLine = splitText[i].split('\t')
      record = {}

      for (const [index, header] of seedData.headers.entries()) {
        record[header] = splitLine[index].toString() ? splitLine[index] : null
      }
      records.push(record)
      // console.log(record)
      if (records.length % 500 == 0 || i == recordLimit) {
        console.log(i)
        try {
          await knex(seedData.tableName).insert(records)
        } catch (err) {
          console.log(err)
        }
        records = []
      }
    }
  }
}

module.exports.restoreSchema = restoreSchema
module.exports.seedRecords = seedRecords
module.exports.createDump = createDump
module.exports.restoreDump = restoreDump
