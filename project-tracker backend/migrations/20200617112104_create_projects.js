exports.up = function (knex) {
    return knex.schema.createTable('projects', (table) => {
        table.increments();
        table.string('name');
        table.integer('clientId').unsigned().references('clients.id');
        table.string('description');
        table.integer('budget');
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
