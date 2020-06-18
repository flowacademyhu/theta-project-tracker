exports.seed = (knex) => {
    return knex('projects').insert([
        {
            name: 'EgyesProjekt',
            clientId: 1,
            description: 'desc',
            budget: 1500
        },
        {
            name: 'KettesProjekt',
            clientId: 1,
            description: 'desc',
            budget: 2000
        }])
}
