import * as workController from "../controllers/work.controller.js";

module.exports = app => {

    // Create a new work
    app.post("/work", workController.create);

    // Retrieve all works
    app.get("/works", workController.findAll);

    // Retrieve a single work with id
    app.get("/work/:id", workController.findById);

    // Retrieve works by Author id
    app.get("/works", workController.findByAuthor);

    // Update a work with id
    app.put("/work/:id", workController.update);

    // Delete a work with id
    app.delete("/work/:id", workController.deleteOne);
};
