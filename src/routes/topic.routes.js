import * as topicController from "../controllers/topic.controller.js";

module.exports = app => {

    // Create a new topic
    app.post("/topic", topicController.create);

    // Create or set a new or existing topic by quote
    app.post("/topic/:quoteid", topicController.setOrCreateByQuote);

    // Retrieve all topics
    app.get("/topics", topicController.findAll);

    // Retrieve a single topic with id
    app.get("/topic/:id", topicController.findById);

    // Retrieve topics by quote id
    app.get("/topics/:quoteid", topicController.findByQuote);

    // Update a topic with id
    app.put("/topic/:id", topicController.update);

    // Delete a topic with id
    app.delete("/topic/:id", topicController.deleteOne);
};
