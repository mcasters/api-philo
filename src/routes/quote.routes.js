import * as quoteController from "../controllers/quote.controller.js";

module.exports = app => {

    // Create a new quote
    app.post("/quote", quoteController.create);

    // Retrieve all quotes
    app.get("/quotes", quoteController.findAll);

    // Retrieve a single quote with id
    app.get("/quote/:id", quoteController.findById);

    // Retrieve quotes by work id
    app.get("/quotes/:workid", quoteController.findByWork);

    // Update a quote with id
    app.put("/quote/:id", quoteController.update);

    // Delete a quote with id
    app.delete("/quote/:id", quoteController.deleteOne);
};
