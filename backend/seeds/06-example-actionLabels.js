exports.seed = (knex) => {
    return knex('actionLabels').insert([
        {
            projectId: 1,
            name: 'development',
        },
        {
            projectId: 1,
            name: 'training',
        },
        {
            projectId: 2,
            name: 'stackoverflow',
        },
        {
            projectId: 2,
            name: 'debug',
        }
    ])
}
