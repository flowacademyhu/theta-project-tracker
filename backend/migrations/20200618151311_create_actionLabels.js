exports.up = function (knex) {
    return knex.schema.createTable('actionLabels', (table) => {
        table.increments();
        table.string('name');
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('actionLabels');
}; 
