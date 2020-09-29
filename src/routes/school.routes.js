import * as schoolController from "../controllers/school.controller.js";

module.exports = app => {

    // Create a new school
    app.post("/school", schoolController.create);

    // Create or set a new or existing school by author
    app.post("/school/:authorid", schoolController.setOrCreateByAuthor);

    // Retrieve all schools
    app.get("/schools", schoolController.findAll);

    // Retrieve a single school with id
    app.get("/school/:id", schoolController.findById);

    // Retrieve schools by Author id
    app.get("/schools/:authorid", schoolController.findByAuthor);

    // Update a school with id
    app.put("/school/:id", schoolController.update);

    // Delete a school with id
    app.delete("/school/:id", schoolController.deleteOne);
};
