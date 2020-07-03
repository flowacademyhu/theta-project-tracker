exports.up = (knex) => {
  return knex.schema.createTable('overtimeMultipliers', (table) => {
      table.increments();
      table.date('date').unique();
      table.float('multiplier').notNullable();
  });
};

exports.down = (knex) => {
    return knex.schema.dropTable('overtimeMultipliers');
};
