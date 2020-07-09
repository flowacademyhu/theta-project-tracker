exports.seed = (knex) => {
    return knex('overtimeMultipliers').insert([
        {
            date: "2020-07-03",
            multiplier: 2
        },
        {
            date: "2020-07-10",
            multiplier: 3
        },
        {
            date: "2020-07-17",
            multiplier: 4
        },
        {
            date: "2020-07-24",
            multiplier: 5
        },
        {
            date: "2020-07-31",
            multiplier: 6
        }
        ])
}
