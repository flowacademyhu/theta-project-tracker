const bcrypt = require('bcrypt');
exports.seed = (knex) => {
  return knex('users').insert([
    {
      firstName: 'Teszt',
      lastName: 'Admin',
      role: 'admin',
      email: 'teszt@admin.com',
      password: bcrypt.hashSync('admin', 10),
      costToCompanyPerHour: 100
    }])
}