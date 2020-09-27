import Sequelize from 'sequelize';

import Author from '../models/Author';

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Author can not be empty!"
        });
    }

    Author.create(req.body)
        .then(author => res.send(author))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the author.`
            });
        });
};

export const findAll = (req, res) => {
    Author.findAll({order: Sequelize.col('date_of_birth')})
        .then(authors => res.send(authors))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving authors.`
            });
        })
};

export const findById = (req, res) => {
    Author.findOne({where: {id: req.params.id}})
        .then(author => res.send(author))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found author with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving author with id " + ${req.params.id}`
                });
            }
        });
};

export const findByName = (req, res) => {
    Author.findOne({where: {lastname: req.params.lastname}})
        .then(author => res.send(author))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found author with lastname ${req.params.lastname}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving author with lastname " + ${req.params.lastname}`
                });
            }
        });
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Author can not be empty!"
        });
    }

    Author.update(req.body, {where: {id: req.params.id}})
        .then(() => {
            Author.findOne({where: {id: req.params.id}})
                .then(author => res.send(author))
        })
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found author with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating author with id " ${req.params.id}`
                });
            }
        })
};

export const deleteOne = (req, res) => {
    Author.destroy({where: {id: req.params.id}})
        .then(() => res.send({message: `Author was deleted successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found author with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete author with id ${req.params.id}`
                });
            }
        });
};
