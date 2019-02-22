exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("projects", column => {
      column.increments()
      column.string("name", 100).notNullable()
      column.string("description", 256)
      column.boolean("completed")
    })
    .createTable("actions", column => {
      column.increments()
      column
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      column.string("description", 256).notNullable()
      column.string("notes", 256)
      column.boolean("completed")
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects").dropTableIfExists("actions");
};
