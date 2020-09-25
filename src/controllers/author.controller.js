import Author from '../models/Author';

export const create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Author can not be empty!"
        });
    }

    Author.cr .create(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the author."`
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    Author.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving authors.`
            });
        else res.send(data);
    });
};

export const findOne = (req, res) => {
    Author.findByUsername(req.params.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found author with username ${req.params.username}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving author with username " + ${req.params.username}`
                });
            }
        } else res.send(data);
    });
};

export const update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Author can not be empty!"
        });
    }

    Author.updateById(
        req.params.id,
        new Author(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found author with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating author with id " ${req.params.id}`
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteOne = (req, res) => {
    Author.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found author with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete author with id ${req.params.id}`
                });
            }
        } else res.send({message: `User was deleted successfully!`});
    });
};

export const deleteAll = (req, res) => {
    Author.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while removing all authors.`
            });
        else res.send({message: `All authors were deleted successfully!`});
    });
};