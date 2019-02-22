exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          name: "rowValue1",
          project_id: 1,
          description: "Great Idea",
          notes: "beginner",
          completed: true
        },
        {
          name: "rowValue2",
          project_id: 1,
          description: "Party Bus",
          notes: "intermediate",
          completed: true
        },
        {
          name: "rowValue3",
          project_id: 1,
          description: "Architecture",
          notes: "Advanced",
          completed: true
        },
        {
          name: "rowValue1",
          project_id: 2,
          description: "Instagram",
          notes: "Advanced",
          completed: true
        },
        {
          name: "rowValue2",
          project_id: 3,
          description: "Projects",
          notes: "beginner",
          completed: true
        },
        {
          name: "rowValue3",
          project_id: 3,
          description: "Testing",
          notes: "intermediate",
          completed: false
        }
      ]);
    });
};
