exports.seed = (knex) => {
    return knex('clients').insert([
        {
            name: 'Flow Academy',
            description: 'Tudás, élmények útján!'
        },
        {
            name: 'Fluidpay',
            description: 'Complexity. Simplified.'
        },
        {
            name: 'Voodoo Park',
            description: 'Solving the big problems'
        }])
}
