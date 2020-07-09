exports.seed = (knex) => {
    return knex('milestones').insert([
        {
            name: 'First sprint',
            projectId: 5,
            description: 'Beginning, user management'
        },
        {
            name: 'Second sprint',
            projectId: 5,
            description: 'Clients, projects'
        },
        {
            name: 'Third sprint',
            projectId: 5,
            description: 'Calendar, riport, debug'
        },
        {
            name: 'Final sprint',
            projectId: 5,
            description: 'Timesheet, final touch'
        },
        {
            name: 'Logic',
            projectId: 1,
            description: 'Create the methods'
        },
        {
            name: 'Display',
            projectId: 1,
            description: 'Read and print maps'
        },
        {
            name: 'Logic',
            projectId: 2,
            description: 'Create the methods'
        },
        {
            name: 'Handle inputs',
            projectId: 2,
            description: 'Create the keyprocessor'
        },
        {
            name: 'Sounds',
            projectId: 3,
            description: 'Record action effects'
        },
        {
            name: 'Logic',
            projectId: 3,
            description: 'Create the methods'
        },
        {
            name: 'Bunkers',
            projectId: 4,
            description: 'Area and health'
        },
        {
            name: 'Movement',
            projectId: 4,
            description: 'Alien and player movement'
        }
    ])
}
