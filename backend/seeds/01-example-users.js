const bcrypt = require('bcrypt');
exports.seed = (knex) => {
  return knex('users').insert([
    {
      firstName: 'Flow',
      lastName: 'Academy',
      role: 'admin',
      email: 'theta@flow.com',
      password: bcrypt.hashSync('flowpwd', 10),
      costToCompanyPerHour: 0
    },
    {
      firstName: 'Jázon',
      lastName: 'Juhász',
      role: 'user',
      email: 'jazonjuhasz@flow.com',
      password: bcrypt.hashSync('jazonpwd', 10),
      costToCompanyPerHour: 10
    },
    {
      firstName: 'Bence',
      lastName: 'Rácz',
      role: 'user',
      email: 'benceracz@flow.com',
      password: bcrypt.hashSync('bencepwd', 10),
      costToCompanyPerHour: 10
    },
    {
      firstName: 'Máté',
      lastName: 'Szabó',
      role: 'user',
      email: 'mateszabo@flow.com',
      password: bcrypt.hashSync('matepwd', 10),
      costToCompanyPerHour: 10
    },
    {
      firstName: 'Tamás',
      lastName: 'Szemesi',
      role: 'user',
      email: 'tamasszemesi@flow.com',
      password: bcrypt.hashSync('matepwd', 10),
      costToCompanyPerHour: 10
    },
    {
      firstName: 'Zita',
      lastName: 'Szirovicza',
      role: 'user',
      email: 'zitaszirovicza@flow.com',
      password: bcrypt.hashSync('zitapwd', 10),
      costToCompanyPerHour: 10
    },
    {
      firstName: 'Péter',
      lastName: 'Sztantics',
      role: 'user',
      email: 'peterszantics@flow.com',
      password: bcrypt.hashSync('peterpwd', 10),
      costToCompanyPerHour: 10
    }
    ])
}
