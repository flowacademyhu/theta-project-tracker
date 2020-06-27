exports.up = function (knex) {
    return knex.schema.createTable('milestones', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('projectId').unsigned().references('projects.id').notNullable();
        table.string('description');
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deletedAt').nullable();
        table.integer('deletedAtUnix').defaultTo(0);
        table.unique(['name', 'deletedAtUnix']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('milestones');
};
