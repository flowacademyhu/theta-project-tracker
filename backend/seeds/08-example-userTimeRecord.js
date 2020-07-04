exports.seed = (knex) => {
    return knex('userTimeRecords').insert([
        {
            userId: 1,
            projectId: 1,
            milestoneId: 2,
            actionLabelId: 1,
            description: "sample description"
        },
        {
            userId: 2,
            projectId: 1,
            milestoneId: 3,
            actionLabelId: 2,
            description: "sample description"
        },
        {
            userId: 3,
            projectId: 2,
            milestoneId: 2,
            actionLabelId: 3,
            description: "sample description"
        },
        {
            userId: 1,
            projectId: 2,
            milestoneId: 1,
            actionLabelId: 4,
            description: "sample description"
        },
    ])
}
