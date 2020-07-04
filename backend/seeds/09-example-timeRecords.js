exports.seed = (knex) => {
    return knex('timeRecords').insert([
        {
            userTimeRecordId: 1,
            spentTime: 2,
            overTime: 1,
            date: '2020-06-29'
        },
        {
            userTimeRecordId: 1,
            spentTime: 2,
            overTime: 1,
            date: '2020-06-30'
        },
        {
            userTimeRecordId: 1,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-01'
        },
        {
            userTimeRecordId: 1,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-02'
        },
        {
            userTimeRecordId: 1,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-03'
        },
        {
            userTimeRecordId: 1,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-04'
        },
        {
            userTimeRecordId: 1,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-05'
        },
        {
            userTimeRecordId: 2,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-06'
        },
        {
            userTimeRecordId: 2,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-07'
        },
        {
            userTimeRecordId: 2,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-08'
        },
        {
            userTimeRecordId: 2,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-09'
        },
        {
            userTimeRecordId: 2,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-10'
        },
        {
            userTimeRecordId: 2,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-11'
        },
        {
            userTimeRecordId: 2,
            spentTime: 2,
            overTime: 1,
            date: '2020-07-12'
        },
    ])
}
