exports.seed = (knex) => {
    return knex('milestones').insert([
        {
            name: "Milestone One",
            projectId: 1,
            description: "milestone description"
        },
        {
            name: "Milestone Two",
            projectId: 2,
            description: "also milestone description"
        },
        {
            name: "Milestone Three",
            projectId: 3,
            description: "not a description"
        }])
}
