exports.up = function (knex) {
    return knex.schema.createTable('userTimeRecords', (table) => {
        table.increments();
        table.integer('userId').unsigned().references('users.id').notNullable();
        table.integer('milestoneId').unsigned().references('milestones.id').notNullable();
        table.integer('actionLabelId').unsigned().references('actionLabels.id').notNullable();
        table.string('description').nullable();
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('userTimeRecords');
};
