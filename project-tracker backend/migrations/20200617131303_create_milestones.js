exports.up = function(knex) {
    return knex.schema.createTable('milestones', (table) => {
        table.increments();
        table.string('name');
        table.integer('projectId').unsigned().references('projects.id');
        table.string('description');
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('milestones');
};