exports.up = function (knex) {
    return knex.schema.createTable('projects', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('clientId').unsigned().references('clients.id');
        table.string('description');
        table.integer('budget').notNullable();
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.integer('deletedAt').defaultTo(0);
        table.unique(['name', 'deletedAt']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
