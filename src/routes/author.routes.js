import * as authorController from "../controllers/author.controller.js";
import * as quoteController from "../controllers/quote.controller";

module.exports = app => {

    // Create a new author
    app.post("/authors", authorController.create);

    // Retrieve all Contents
    app.get("/authors", authorController.findAll);

    // Retrieve a single Content with id
    app.get("/author/:id", authorController.findById);

    // Retrieve author by school id
    app.get("/authors-by-school/:schoolid", authorController.findBySchool);

    // Retrieve a single Content with lastname
    app.get("/author", authorController.findByName);

    // Update a Content with id
    app.put("/authors/:id", authorController.update);

    // Remove a school from an author
    app.put("/author-remove-school/:id", authorController.removeSchool);

    // Delete a Content with id
    app.delete("/authors/:id", authorController.deleteOne);
};
