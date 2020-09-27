import * as notableIdeaController from "../controllers/notableIdea.controller.js";

module.exports = app => {

    // Create a new notableIdea
    app.post("/notableideas", notableIdeaController.create);

    // Retrieve all notableideas
    app.get("/notableideas", notableIdeaController.findAll);

    // Retrieve a single notableIdea with id
    app.get("/notableideas/:id", notableIdeaController.findById);

    // Retrieve a single notableIdea with lastname
    app.get("/notableideas/:lastname", notableIdeaController.findByAuthor);

    // Update a notableIdea with id
    app.put("/notableideas/:id", notableIdeaController.update);

    // Delete a notableIdea with id
    app.delete("/notableideas/:id", notableIdeaController.deleteOne);
};
