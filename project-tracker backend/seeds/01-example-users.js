const bcrypt = require('bcrypt');
exports.seed = (knex) => {
  return knex('users').insert([
    {
      firstName: 'Egyes',
      lastName: 'Macska',
      role: 'admin',
      email: 'teszt@admin.com',
      password: bcrypt.hashSync('admin', 10),
      costToCompanyPerHour: 100
    },
    {
      firstName: 'Kettes',
      lastName: 'Macska',
      role: 'user',
      email: 'teszt@admin.com',
      password: bcrypt.hashSync('miowmiow', 10),
      costToCompanyPerHour: 200
    }])
}
