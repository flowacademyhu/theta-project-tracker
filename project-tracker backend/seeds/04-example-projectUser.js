exports.seed = (knex) => {
    return knex('projectUsers').insert([
        {
            projectId: 1,
            userId: 2,
            costToClientPerHour: 10
        },
        {
            projectId: 2,
            userId: 3,
            costToClientPerHour: 40
        }])
}
