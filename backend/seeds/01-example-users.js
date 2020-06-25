const bcrypt = require('bcrypt');
exports.seed = (knex) => {
  return knex('users').insert([
    {
      firstName: 'User',
      lastName: 'Test',
      role: 'user',
      email: 'user@test.com',
      password: bcrypt.hashSync('user', 10),
      costToCompanyPerHour: 100
    },
    {
      firstName: 'Ian',
      lastName: 'Holm',
      role: 'user',
      email: 'ianholm@test.com',
      password: bcrypt.hashSync('bilbo', 10),
      costToCompanyPerHour: 100
    },
    {
      firstName: 'Admin',
      lastName: 'Test',
      role: 'admin',
      email: 'admin@test.com',
      password: bcrypt.hashSync('admin', 10),
      costToCompanyPerHour: 200
    }])
}
