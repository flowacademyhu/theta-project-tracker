exports.seed = (knex) => {
    return knex('projectUsers').insert([
        {
<<<<<<< HEAD:project-tracker backend/seeds/04-example-projectUser.js
            projectId: 3,
            userId: 4,
=======
            projectId: 1,
            userId: 1,
>>>>>>> master:backend/seeds/04-example-projectUser.js
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
