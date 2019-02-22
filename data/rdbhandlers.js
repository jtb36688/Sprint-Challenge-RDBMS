const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addProject,
  getProjects,
  removeProject,
  modifyProject,
  addAction,
  getAction
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
      if (Project) {
        Project.Actions = Actions;
        return ProjectToBody(Project);
      } else {
        return null;
      }
    });
  }
  return query;
}

function getProjectActions(id) {
  return db("actions")
    .where("project_id", id)
    .then(Actions => Actions.map(Action => ActionToBody(Action)));
}

function removeProject(id) {
  return db("projects")
    .where({ id: id })
    .del();
}

async function modifyProject(id, request) {
  const conditional = await db('projects')
    .where("id", Number(id))
    .update(request);
  if (conditional) {
    return getById(id);
  } else {
    return null;
  }
}

function addAction(request) {
    return db("actions").insert(request)
}

function ProjectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };
  if (project.actions) {
    result.Actions = project.actions.map(action => ({
      ...action,
      completed: intToBoolean(action.completed),
    }));
  }
  return result;
}

function ActionToBody(action) {
    return {
      ...action,
      completed: intToBoolean(action.completed),
    };
  }

  function intToBoolean(int) {
    return int === 1 ? true : false
  }
