
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {actions_id: 1, contexts_id: 1},
        {actions_id: 2, contexts_id: 1},
        {actions_id: 3, contexts_id: 1},
        {actions_id: 3, contexts_id: 2},
        {actions_id: 4, contexts_id: 1},
        {actions_id: 4, contexts_id: 2},
        {actions_id: 4, contexts_id: 4},
        {actions_id: 5, contexts_id: 1},
        {actions_id: 5, contexts_id: 3},
        {actions_id: 5, contexts_id: 4},
        {actions_id: 6, contexts_id: 3},
      ]);
    });
};
