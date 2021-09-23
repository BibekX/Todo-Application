const express = require("express");

class TodoRouter {
  constructor(todoService, authClass) {
    this.todoService = todoService;
    this.authClass = authClass;
  }

  router() {
    let router = express.Router();

    router.post("/login", this.login.bind(this));
    router.post("/signup", this.signup.bind(this));
    router.get("/todos", this.authClass.authenticate(), this.list.bind(this));
    router.post("/todos", this.authClass.authenticate(), this.add.bind(this));
    router.put(
      "/todos/",
      this.authClass.authenticate(),
      this.update.bind(this)
    );
    router.delete(
      "/todos/:id",
      this.authClass.authenticate(),
      this.remove.bind(this)
    );

    return router;
  }

  login(req, res) {
    return this.todoService
      .login(req.body.email, req.body.password)
      .then((token) => (token ? res.json(token) : res.sendStatus(401)));
  }

  signup(req, res) {
    return this.todoService
      .signup(req.body.username, req.body.email, req.body.password)
      .then((userId) => res.send(userId));
  }

  list(req, res) {
    return this.todoService
      .list(req.user[0])
      .then((todoData) => res.send(todoData));
  }

  add(req, res) {
    return this.todoService
      .add(req.user[0], req.body.title)
      .then((todo) => res.send(todo[0]));
  }

  update(req, res) {
    return this.todoService
      .update(req.user[0], req.body.title, req.body.id)
      .then((todo) => res.send(JSON.stringify(todo)));
  }

  remove(req, res) {
    return this.todoService
      .remove(req.user[0], req.params.id)
      .then(() => res.send(req.params.id));
  }
}

module.exports = TodoRouter;
