exports.seed = (knex) => {
    return knex('projectUsers').insert([
        {
            projectId: 1,
            userId: 1,
            costToClientPerHour: 10
        },
        {
            projectId: 2,
            userId: 2,
            costToClientPerHour: 40
        },
        {
            projectId: 3,
            userId: 3,
            costToClientPerHour: 100
        }])
}
