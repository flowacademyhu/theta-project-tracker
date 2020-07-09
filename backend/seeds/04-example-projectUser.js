exports.seed = (knex) => {
    return knex('projectUsers').insert([
        {
            projectId: 5,
            userId: 2,
            costToClientPerHour: 15
        },
        {
            projectId: 5,
            userId: 3,
            costToClientPerHour: 15
        },
        {
            projectId: 5,
            userId: 4,
            costToClientPerHour: 15
        },
        {
            projectId: 5,
            userId: 5,
            costToClientPerHour: 15
        },
        {
            projectId: 5,
            userId: 6,
            costToClientPerHour: 15
        },
        {
            projectId: 5,
            userId: 7,
            costToClientPerHour: 15
        },
        {
            projectId: 1,
            userId: 6,
            costToClientPerHour: 10
        },
        {
            projectId: 2,
            userId: 2,
            costToClientPerHour: 10
        },
        {
            projectId: 2,
            userId: 7,
            costToClientPerHour: 10
        },
        {
            projectId: 3,
            userId: 3,
            costToClientPerHour: 10
        },
        {
            projectId: 3,
            userId: 4,
            costToClientPerHour: 10
        },
        {
            projectId: 4,
            userId: 5,
            costToClientPerHour: 10
        }])
}
