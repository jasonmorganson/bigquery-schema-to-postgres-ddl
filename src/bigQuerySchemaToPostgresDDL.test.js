const env = process.env
const argv = process.argv

beforeAll(() => {
    process.env = {
        ...env,
        SCHEMA: 'SCHEMA',
        TABLE: 'TABLE'
    }
    const [exec, path] = process.argv
    process.argv = [exec, path]
})

test.each`
    type           | json
    ${'BAD'}       | ${[{ type: 'FOO', name: 'BAR' }]}
    ${'STRING'}    | ${[{ type: 'STRING', name: 'STRING' }]}
    ${'INTEGER'}   | ${[{ type: 'INTEGER', name: 'INTEGER' }]}
    ${'NUMERIC'}   | ${[{ type: 'NUMERIC', name: 'NUMERIC' }]}
    ${'FLOAT'}     | ${[{ type: 'FLOAT', name: 'FLOAT' }]}
    ${'GEOGRAPHY'} | ${[{ type: 'GEOGRAPHY', name: 'GEOGRAPHY' }]}
    ${'BOOLEAN'}   | ${[{ type: 'BOOLEAN', name: 'BOOLEAN' }]}
    ${'DATE'}      | ${[{ type: 'DATE', name: 'DATE' }]}
    ${'TIMESTAMP'} | ${[{ type: 'TIMESTAMP', name: 'TIMESTAMP' }]}
`('Converting $type matches snapshot', ({ json }) => {
    const bigQuerySchemaToPostgresDDL = require('./bigQuerySchemaToPostgresDDL')
    const ddl = bigQuerySchemaToPostgresDDL(json)
    expect(ddl).toMatchSnapshot()
})

afterAll(() => {
    process.env = env
    process.argv = argv
})
