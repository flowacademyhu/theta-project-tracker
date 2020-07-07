exports.seed = (knex) => {
    return knex('userTimeRecords').insert([
        {
            userId: 1,
            milestoneId: 2,
            actionLabelId: 1,
            description: "sample description",
            week: '2020-06-29'
        },
        {
            userId: 2,
            milestoneId: 3,
            actionLabelId: 2,
            description: "sample description",
            week: '2020-07-06'
        }
    ])
}
