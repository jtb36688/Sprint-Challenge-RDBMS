const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addProject,
  getProjects,
  getProjectActions,
};

function addProject(request) {
  return db("projects").insert(request);
}

function getProjects(id) {
  let query = db("projects");

  if (id && id > 0) {
    query.where("id", id).first();
    return Promise.all([query, this.getProjectActions(id)]).then(results => {
      let [Project, Actions] = results;
        Project.Actions = Actions;
        return ProjectToBody(Project);
      })}
    return query;
  }



function getAction(id) {
  let query = db("Actions");

  if (id && id > 0) {
    query.where("id", id).first();
    return Promise.all([query, getActionIngredients(id)]).then(results => {
      let [Action, ingredients] = results;
      if (Action) {
        Action.ingredients = ingredients;
        return ActionToBody(Action);
      } else {
        return null;
      }
    })
  }
  return query
}

