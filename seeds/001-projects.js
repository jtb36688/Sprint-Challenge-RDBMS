
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'User Interface', description: 'Lambda Week 1', completed: true},
        {name: 'Front-End', description: 'Lambda Week 6', completed: true},
        {name: 'Back-End', description: 'Lambda Week 11', completed: false}
      ]);
    });
};
