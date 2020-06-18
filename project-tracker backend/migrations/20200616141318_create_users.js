exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('firstName');
      table.string('lastName');
      table.enu('role', ['admin', 'user']).defaultTo('user');
      table.string('email');
      table.string('password');
      table.integer('costToCompanyPerHour');
      table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('users');
  };    