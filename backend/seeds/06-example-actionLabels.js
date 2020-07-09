exports.seed = (knex) => {
    return knex('actionLabels').insert([
        {
            projectId: 5,
            name: 'new feature',
        },
        {
            projectId: 5,
            name: 'debug',
        },
        {
            projectId: 5,
            name: 'stackoverflow',
        },
        {
            projectId: 5,
            name: 'test',
        }
    ])
}
