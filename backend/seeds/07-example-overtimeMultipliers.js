exports.seed = (knex) => {
    return knex('overtimeMultipliers').insert([
        {
            date: "2020-07-01",
            multiplier: 2
        },
        {
            date: "2020-07-02",
            multiplier: 2
        },
        {
            date: "2020-07-03",
            multiplier: 3
        }])
}
