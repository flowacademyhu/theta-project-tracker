exports.seed = (knex) => {
    return knex('userTimeRecords').insert([
        {
            userId: 2,
            milestoneId: 4,
            actionLabelId: 1,
            description: "Swagger",
            week: '2020-07-06'
        },
        {
            userId: 2,
            milestoneId: 4,
            actionLabelId: 4,
            description: "postman testing",
            week: '2020-07-06'
        },
        {
            userId: 3,
            milestoneId: 4,
            actionLabelId: 1,
            description: "header",
            week: '2020-07-06'
        },
        {
            userId: 4,
            milestoneId: 4,
            actionLabelId: 1,
            description: "CRUD",
            week: '2020-07-06'
        },
        {
            userId: 5,
            milestoneId: 4,
            actionLabelId: 1,
            description: "Pagination",
            week: '2020-07-06'
        },
        {
            userId: 6,
            milestoneId: 4,
            actionLabelId: 1,
            description: "Users",
            week: '2020-07-06'
        },
        {
            userId: 7,
            milestoneId: 4,
            actionLabelId: 1,
            description: "Milestones",
            week: '2020-07-06'
        }
    ])
}
