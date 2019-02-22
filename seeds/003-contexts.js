
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contexts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('contexts').insert([
        {description: "CSS"},
        {description: "Animations"},
        {description: "Node"},
        {description: "React"}
      ]);
    });
};
