const express = require("express");
const helmet = require("helmet");
const db = require("./data/rdbhandlers.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.post("/api/projects", (req, res) => {
  const { name } = req.body;
  const addition = { name };
  if (!name) {
    return res
      .status(400)
      .json({ error: "Please provide a name for your project" });
  }
  db.addProject(addition)
    .then(add => {
      res.status(201).json(add);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get("/api/projects", (req, res) => {
  db.getProjects()
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get("/api/projects/:id", (req, res) => {
    const { id } = req.params;
  db.getProjects(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({
          error: "Unable to find any projects matching ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
