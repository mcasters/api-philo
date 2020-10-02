import * as readingSheetController from "../controllers/readingSheet.controller.js";

module.exports = app => {

    // Create a new readingSheet
    app.post("/readingsheet", readingSheetController.create);

    // Retrieve all readingSheets
    app.get("/readingsheets", readingSheetController.findAll);

    // Retrieve a single readingSheet with id
    app.get("/readingsheet/:id", readingSheetController.findById);

    // Update a readingSheet with id
    app.put("/readingsheet/:id", readingSheetController.update);

    // Delete a readingSheet with id
    app.delete("/readingsheet/:id", readingSheetController.deleteOne);
};
