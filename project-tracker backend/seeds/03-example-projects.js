exports.seed = (knex) => {
    return knex('projects').insert([
        {
            name: 'Project One',
            clientId: 1,
            description: 'its filled',
            budget: 1500
        },
        {
            name: 'Project Two',
            clientId: 2,
            description: 'its not',
            budget: 2000
        },
        {
            name: 'Project Three',
            clientId: 3,
            description: 'description',
            budget: 2500
        }])
}
