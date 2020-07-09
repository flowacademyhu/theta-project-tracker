exports.seed = (knex) => {
    return knex('projects').insert([
        {
            name: 'Adventure',
            clientId: 1,
            description: 'Classic game',
            budget: 800
        },
        {
            name: 'Bomberman',
            clientId: 1,
            description: 'Try it out',
            budget: 800
        },
        {
            name: 'Pengo',
            clientId: 1,
            description: 'Penguins',
            budget: 800
        },
        {
            name: 'Space Invaders',
            clientId: 1,
            description: 'Arcade game',
            budget: 800
        },
        {
            name: 'Project Tracker',
            clientId: 3,
            description: 'Final project',
            budget: 2500
        },
        {
            name: 'Test Aggregator',
            clientId: 2,
            description: 'Final project',
            budget: 2500
        }
        ])
}
