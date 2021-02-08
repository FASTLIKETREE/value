const schema = require('./schema.js')
const connection = require('./connection')
const fs = require('fs')

const database = 'value'
const dataFolder = './data'

// Set numRecords to undefined to seed all records
const seedDb = [
  {
    seed: false,
    headers : ['adsh','cik','name','sic','countryba','stprba','cityba','zipba','bas1','bas2',
      'baph','countryma','stprma','cityma','zipma','mas1','mas2','countryinc','stprinc','ein',
      'former','changed','afs','wksi','fye','form','period','fy','fp','filed','accepted','prevrpt','detail','instance','nciks','aciks'],
    fileName: 'sub.txt',
    tableSuffix: 'subs',
    numRecords: undefined
  }, {
    seed: false,
    headers : ['tag','version','custom','abstract','datatype','iord','crdr','tlabel','doc'],
    fileName: 'tag.txt',
    tableSuffix: 'tags',
    numRecords: undefined
  }, {
    seed: true,
    headers : ['adsh', 'tag', 'version', 'coreg', 'ddate', 'qtrs', 'uom', 'value', 'footnote'],
    fileName: 'num.txt',
    tableSuffix: 'nums',
    numRecords: undefined
  }, {
    seed: false,
    headers : ['adsh','report','line','stmt','inpth','rfile','tag','version','plabel','negating'],
    fileName: 'pre.txt',
    tableSuffix: 'pres',
    numRecords: undefined
  }
]

async function seedRecords() {
  schema.restoreSchema()
  const knex = await connection.getConnection()
  console.log("max pool below!")
  console.log(knex.client.pool.max)

  // return
  const before = Date.now()
  let quarterlyDataFolderNames = schema.getQuarterlyDataFolderNames()
  // only one quarter right now
  quarterlyDataFolderNames = [quarterlyDataFolderNames[0]]

  for (const quarterlyDataFolderName of quarterlyDataFolderNames) {
    for (const seedData of seedDb) {
      if (!seedData.seed) { continue }

      console.log("Seeding data below!")
      console.log(seedData)
      // if (seedData.seed === false) { continue }
      const file = fs.readFileSync(`${dataFolder}/${quarterlyDataFolderName}/${seedData.fileName}`, 'utf-8')
      const splitText = file.split('\n')

      let records = []
      let parr = []
      const recordLimit = seedData.numRecords ? seedData.numRecords : splitText.length - 2
      for (let i = 1; i <= recordLimit; ++i) {
        const splitLine = splitText[i].split('\t')
        record = {}

        for (const [index, header] of seedData.headers.entries()) {
          record[header] = splitLine[index].toString() ? splitLine[index] : null
        }
        records.push(record)
        if (records.length % 200 == 0 || i == recordLimit) {
          if (i === recordLimit) {
            console.log("WE HIT THE RECORD LIMIT")
          }
          console.log(i)
          try {
            const insertPromise = knex(`${quarterlyDataFolderName}_${seedData.tableSuffix}`).insert(records)
            parr.push(insertPromise)
            // await insertPromise
          } catch (err) {
            console.log(err)
          }
          records = []
        }
        if (parr.length === 10) {
          console.log("we hit parr 10! clearing out parr")
          await Promise.all(parr)
          parr = []
        }
      }
      // 2890146
      // Time in seconds: 60.648

      // Single 2019q1 num records with await in batches of 500
      // Time in seconds: 119.853
      await Promise.all(parr)
    }
  }
  const after = Date.now()
  console.log(`Time in seconds: ${(after-before)/1000}`)
  await knex.destroy()
}

seedRecords()

module.exports.seedRecords = seedRecords

