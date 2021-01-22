const gulp = require('gulp')
const del = require('del')
const eslint = require('gulp-eslint')
const log = require('fancy-log')
const ts = require('gulp-typescript')
const seed = require('./db/seed')

const dist = './dist'
const src = './src'

// ---- all ----
gulp.task('clean', () => {
  return del([dist])
})

// ---- dev server ----
gulp.task('lint', () => {
  return gulp.src([src + '/**/*.ts'])
    .pipe(eslint(src + '/.eslintrc.yml'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('ts', () => {
  const tsProject = ts.createProject('tsconfig.json')
  // log(`transpiling ${obj.path} to ./dist`)
  gulp.src('./src/**/*', { 'base': './' })
    .pipe(tsProject())
    .pipe(gulp.dest('./dist'))
})

gulp.task('seed', () => {
  seed.restoreSchema()
})

gulp.task('watch', () => {
  return gulp.watch('./src/**/*', function(obj) {
    if (obj.type === 'changed') {
      if (obj.path.match(/\.ts$/)) {
        const tsProject = ts.createProject('tsconfig.json')
        log(`transpiling ${obj.path} to ./dist`)
        gulp.src( obj.path, { 'base': './' })
          .pipe(tsProject())
          .pipe(gulp.dest('./dist'))
      }
      if (obj.path.match(/\.js$/)) {
        log(`copying ${obj.path} to ./dist`)
        gulp.src( obj.path, { 'base': './' })
          .pipe(gulp.dest('./dist'))
      }
    }
  })
})


gulp.task('default', ['ts'])
