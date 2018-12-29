var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    let newEmail = req.body.email;
    //checks if the email input is already in use - if so, send a 404
    db.User.findOne({
      where: {email: newEmail}
    }).then(result=>{
      if(!result){
        db.User.create(req.body).then(data=>
          res.json(data));
      }else(
        res.status(404).end()
      );
    })
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
