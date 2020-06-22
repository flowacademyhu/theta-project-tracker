exports.seed = (knex) => {
    return knex('clients').insert([
        {
            name: 'EgyesKliens',
            description: 'desc'
        },
        {
            name: 'KettesKliens',
            description: 'desc'
        }])
}
