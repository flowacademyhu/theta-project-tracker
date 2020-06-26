exports.seed = (knex) => {
    return knex('timeRecords').insert([
        {
            userId: 3,
            milestoneId: 1,
            actionLabelId: 1,
            description: 'something',
            spentTime: 2,
            overTime: 1,
            date: new Date().toISOString().slice(0, 10).replace('T', ' ')
        },
        {
            userId: 1,
            milestoneId: 2,
            actionLabelId: 1,
            description: 'something2',
            spentTime: 1,
            overTime: 1,
            date: new Date().toISOString().slice(0, 10).replace('T', ' ')
        },
        {
            userId: 2,
            milestoneId: 3,
            actionLabelId: 2,
            description: 'something3',
            spentTime: 1,
            overTime: 1,
            date: new Date().toISOString().slice(0, 10).replace('T', ' ')
        }
    ])
}
