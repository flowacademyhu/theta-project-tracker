exports.up = function (knex) {
    return knex.schema.createTable('timeRecords', (table) => {
        table.increments();
        table.integer('userId').unsigned().references('users.id');
        table.integer('projectId').unsigned().references('projects.id');
        table.integer('milestoneId').unsigned().references('milestones.id');
        table.integer('actionLabelId').unsigned().references('actionLabels.id');
        table.string('description').nullable();
        table.float('spentTime');
        table.float('overTime');
        table.date('date');
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('timeRecords');
};
