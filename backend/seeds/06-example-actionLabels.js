exports.seed = (knex) => {
    return knex('actionLabels').insert([
        {
            name: 'development',
        },
        {
            name: 'training',
        }
    ])
}
