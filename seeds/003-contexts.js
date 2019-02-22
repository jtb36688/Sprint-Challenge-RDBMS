
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {description: "CSS"},
        {description: "Animations"},
        {description: "Node"},
        {description: "React"}
      ]);
    });
};
