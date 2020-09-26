import * as authorController from "../controllers/author.controller.js";

module.exports = app => {

    // Create a new author
    app.post("/authors", authorController.create);

    // Retrieve all Contents
    app.get("/authors", authorController.findAll);

    // Retrieve a single Content with id
    app.get("/authors/:id", authorController.findById);

    // Retrieve a single Content with lastname
    app.get("/authors/:lastname", authorController.findByName);

    // Update a Content with id
    app.put("/authors/:id", authorController.update);

    // Delete a Content with id
    app.delete("/authors/:id", authorController.deleteOne);
};
