exports.seed = (knex) => {
    return knex('projectUsers').insert([
        {
            projectId: 3,
            userId: 2,
            costToClientPerHour: 10
        },
        {
            projectId: 4,
            userId: 3,
            costToClientPerHour: 40
        }])
}
