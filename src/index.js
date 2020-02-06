const stdin = process.stdin
const stdout = process.stdout
const BigQuerySchemaToPostgresDDLTransform = require('./src/BigQuerySchemaToPostgresDDLTransform.js')

stdin
    .setEncoding('utf8')
    .pipe(BigQuerySchemaToPostgresDDLTransform)
    .pipe(stdout)
