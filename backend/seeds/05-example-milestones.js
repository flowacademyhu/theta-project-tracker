exports.seed = (knex) => {
  return knex('milestones').insert([
      {
          name: 'milestoneOne',
          projectId: 1,
          description: 'milestone 1'
      },
      {
          name: 'milestoneTwo',
          projectId: 1,
          description: 'milestone 2'
      },
    {
      name: 'pagination',
      projectId: 2,
      description: 'milestone for pagination'
    }])
}
