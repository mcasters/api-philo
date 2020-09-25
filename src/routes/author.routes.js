import * as authorController from "../controllers/author.controller.js";

module.exports = app => {

    // Create a new Content
    app.post("/authors", authorController.create);

    // Retrieve all Contents
    app.get("/authors", authorController.findAll);

    // Retrieve a single Content with id
    app.get("/authors/:name", authorController.findOne);

    // Update a Content with id
    app.put("/authors/:id", authorController.update);

    // Delete a Content with id
    app.delete("/authors/:id", authorController.deleteOne);

    // Delete all Contents
    app.delete("/authors", authorController.deleteAll);
};
