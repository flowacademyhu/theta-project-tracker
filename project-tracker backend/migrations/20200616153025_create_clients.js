exports.up = function (knex) {
    return knex.schema.createTable('clients', (table) => {
        table.increments();
        table.string('name').unique().notNullable();
        table.string('description');
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.string('deletedAt').defaultTo(null);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('clients');
};