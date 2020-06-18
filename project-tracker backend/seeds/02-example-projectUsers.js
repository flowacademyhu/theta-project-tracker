exports.seed = (knex) => {
  return knex('projectUsers').insert([
    {
      projectId: 1,
      userId: 3,
      costToClientPerHour: 100
    }])
}