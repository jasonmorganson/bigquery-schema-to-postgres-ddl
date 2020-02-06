const postgres = require('knex')({ client: 'pg' })
const { SCHEMA, TABLE } = process.env
const [, , schema = SCHEMA, table = TABLE] = process.argv

/**
 * Convert BigQuery schema in JSON form to a Postgres table DLL.
 */
const bigQuerySchemaToPostgresDDL = json =>
    postgres.schema
        .withSchema(schema)
        .createTable(table, table => {
            json.forEach(({ name, type }) => {
                if (type === 'STRING') {
                    table.text(name)
                }

                if (type === 'INTEGER') {
                    table.integer(name)
                }

                if (type === 'NUMERIC') {
                    table.specificType(name, 'NUMERIC')
                }

                if (type === 'FLOAT') {
                    table.specificType(name, 'FLOAT')
                }

                if (type === 'GEOGRAPHY') {
                    table.specificType(name, 'public.GEOGRAPHY')
                }

                if (type === 'BOOLEAN') {
                    table.boolean(name)
                }

                if (type === 'DATE') {
                    table.timestamp(name)
                }

                if (type === 'TIMESTAMP') {
                    table.timestamp(name)
                }
            })
        })
        .toString()

module.exports = bigQuerySchemaToPostgresDDL
