exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('firstName').notNullable()
      table.string('lastName').notNullable();
      table.enu('role', ['admin', 'user']).defaultTo('user');
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.integer('costToCompanyPerHour').notNullable();
      table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.enu('isDeleted', ['true', 'false']).defaultTo('false');
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('users');
  };    
