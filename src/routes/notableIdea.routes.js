import * as notableIdeaController from "../controllers/notableIdea.controller.js";

module.exports = app => {

    // Create a new notableIdea
    app.post("/notableidea", notableIdeaController.create);

    // Retrieve all notableideas
    app.get("/notableideas", notableIdeaController.findAll);

    // Retrieve a single notableIdea with id
    app.get("/notableidea/:id", notableIdeaController.findById);

    // Retrieve notableIdeas by author id
    app.get("/notableideas", notableIdeaController.findByAuthor);

    // Update a notableIdea with id
    app.put("/notableidea/:id", notableIdeaController.update);

    // Delete a notableIdea with id
    app.delete("/notableidea/:id", notableIdeaController.deleteOne);
};
