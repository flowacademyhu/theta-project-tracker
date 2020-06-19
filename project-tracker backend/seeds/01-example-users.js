const bcrypt = require('bcrypt');
exports.seed = (knex) => {
  return knex('users').insert([
    {
      firstName: 'Egyes',
      lastName: 'Macska',
      role: 'admin',
      email: 'egyes@test.com',
      password: bcrypt.hashSync('admin', 10),
      costToCompanyPerHour: 100
    },
    {
      firstName: 'Kettes',
      lastName: 'Macska',
      role: 'user',
      email: 'kettes@test.com',
      password: bcrypt.hashSync('miowmiow', 10),
      costToCompanyPerHour: 200
    }])
}
