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
      email: 'jazon.juhasz@flow.com',
      password: bcrypt.hashSync('jazonpwd', 10),
      costToCompanyPerHour: 10
    },
    {
      firstName: 'Bence',
      lastName: 'Rácz',
      role: 'user',
      email: 'bence.racz@flow.com',
      password: bcrypt.hashSync('bencepwd', 10),
      costToCompanyPerHour: 11
    },
    {
      firstName: 'Máté',
      lastName: 'Szabó',
      role: 'user',
      email: 'mate.szabo@flow.com',
      password: bcrypt.hashSync('matepwd', 10),
      costToCompanyPerHour: 12
    },
    {
      firstName: 'Tamás',
      lastName: 'Szemesi',
      role: 'user',
      email: 'tamas.szemesi@flow.com',
      password: bcrypt.hashSync('matepwd', 10),
      costToCompanyPerHour: 13
    },
    {
      firstName: 'Zita',
      lastName: 'Szirovicza',
      role: 'user',
      email: 'zita.szirovicza@flow.com',
      password: bcrypt.hashSync('zitapwd', 10),
      costToCompanyPerHour: 14
    },
    {
      firstName: 'Péter',
      lastName: 'Sztantics',
      role: 'user',
      email: 'peter.sztantics@flow.com',
      password: bcrypt.hashSync('peterpwd', 10),
      costToCompanyPerHour: 15
    }
    ])
}
