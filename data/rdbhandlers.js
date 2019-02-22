const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addProject,
  getProjects,
  removeProject,
  modifyProject,
  addAction,
  getActions,
  removeAction
};

function addProject(request) {
  return db("projects").insert(request);
}

function getActions(id) {
  let query = db("actions");

  if (id && id > 0) {
    query.where("id", id).first();
    return Promise.all([query, getActionContexts(id)]).then(results => {
      let [action, contexts] = results;
      if (action) {
        action.contexts = contexts;
        return ActionToBody(action);
      } else {
        return null;
      }
    });
  }
  return query.then(actions => {
    return actions.map(action => ActionToBody(action));
  });
}

function getActionContexts(id) {
  return db("contexts")
  .select('contexts.description')
  .where("actions_id", id)
  .join("action_contexts", 'action_contexts.contexts_id', '=', 'contexts.id')
}

function getProjects(id) {
  let query = db("projects");

  if (id && id > 0) {
    query.where("id", id).first();
    return Promise.all([query, getProjectActions(id)]).then(results => {
      let [Project, Actions] = results;
      if (Project) {
        Project.Actions = Actions;
        return ProjectToBody(Project);
      } else {
        return null;
      }
    });
  }
  return query.then(projects => {
    return projects.map(project => ProjectToBody(project));
  });
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

function removeAction(id) {
  return db("actions")
    .where({ id: id })
    .del();
}

async function modifyProject(id, request) {
  const conditional = await db("projects")
    .where("id", Number(id))
    .update(request);
  if (conditional) {
    return getById(id);
  } else {
    return null;
  }
}

function addAction(request) {
  return db("actions").insert(request);
}

function ProjectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed)
  };
  if (project.actions) {
    result.Actions = project.actions.map(action => ({
      ...action,
      completed: intToBoolean(action.completed)
    }));
  }
  return result;
}

function ActionToBody(action) {
  const result = {
    id: action.id,
    description: action.description,
    notes: action.notes,
    completed: intToBoolean(action.completed)
  };

  if (action.contexts) {
    result.contexts = action.contexts.map(context => ({
      ...context
    }));
  }
  return result;
}

function intToBoolean(int) {
  return int === 1 ? true : false;
}
