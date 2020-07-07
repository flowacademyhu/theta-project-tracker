exports.up = function (knex) {
    return knex.schema.createTable('timeRecords', (table) => {
        table.increments();
        table.integer('userTimeRecordId').unsigned().references('userTimeRecords.id').onDelete('CASCADE');
        table.float('normalHours').notNullable().defaultTo(0);
        table.float('overTime').notNullable().defaultTo(0);
        table.date('date');
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.unique(['userTimeRecordId', 'date']);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('timeRecords');
};
