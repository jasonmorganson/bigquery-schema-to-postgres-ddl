const stream = require('stream')
const bigquerySchematoPostgresDDL = require('./bigQuerySchemaToPostgresDDL')
const Transform = stream.Transform

/**
 * Stream transform to transform BiGQuery schema in JSON form to a Postgres
 * table DDL.
 */
const BigQuerySchemaToPostgresDDL = new Transform({
    transform(chunk, encoding, processed) {
        const string = chunk.toString()
        const json = JSON.parse(string)
        const ddl = bigquerySchematoPostgresDDL(json)

        this.push(ddl)

        processed()
    }
})

module.exports = BigQuerySchemaToPostgresDDL
