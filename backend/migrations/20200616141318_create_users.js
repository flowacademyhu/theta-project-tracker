exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('firstName').notNullable()
      table.string('lastName').notNullable();
      table.enu('role', ['admin', 'user']).defaultTo('user');
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.integer('costToCompanyPerHour').notNullable();
      table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.integer('deletedAtUnix').defaultTo(0);
      table.unique(['email', 'deletedAtUnix']);
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('users');
  };    
