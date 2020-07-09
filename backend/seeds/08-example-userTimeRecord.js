exports.seed = (knex) => {
    return knex('userTimeRecords').insert([
        {
            userId: 2,
            milestoneId: 1,
            actionLabelId: 1,
            description: "CRUD and swagger",
            week: '2020-06-15'
        },
        {
            userId: 2,
            milestoneId: 1,
            actionLabelId: 4,
            description: "postman testing",
            week: '2020-06-15'
        }
    ])
}
