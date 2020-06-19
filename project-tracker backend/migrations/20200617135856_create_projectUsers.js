exports.up = function(knex) {
    return knex.schema.createTable('projectUsers', (table) => {
        table.increments();
        table.integer('projectId').unsigned().references('projects.id');
        table.integer('userId').unsigned().references('users.id');
        table.integer('costToClientPerHour');
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projectUsers');
}; 