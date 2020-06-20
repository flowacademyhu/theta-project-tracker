exports.seed = (knex) => {
    return knex('clients').insert([
        {
            name: 'Client One',
            description: 'this is a description'
        },
        {
            name: 'Client Two',
            description: 'also a description'
        },
        {
            name: 'Client Three',
            description: 'this is not.'
        }])
}
