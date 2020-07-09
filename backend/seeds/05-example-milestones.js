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
            name: 'Make it work',
            projectId: 1,
            description: ''
        },
        {
            name: 'Make it work',
            projectId: 2,
            description: ''
        },
        {
            name: 'Make it work',
            projectId: 3,
            description: ''
        },
        {
            name: 'Make it work',
            projectId: 4,
            description: ''
        }
    ])
}
