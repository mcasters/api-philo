import Sequelize from 'sequelize';

import NotableIdea from '../models/NotableIdea';
import Author from "../models/Author";

export const create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "NotableIdea can not be empty!"
        });
    }

    const author = await Author.findOne({where: {id: req.body.authorid}});
    if (!author) {
        res.status(404).send({
            message: `Author not found.`
        });
    } else {
        author.createNotableIdea({title: req.body.title})
            .then(idea => res.send(idea))
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while creating the notable idea.`
                });
            });
    }
};

export const findAll = (req, res) => {
    NotableIdea.findAll({order: Sequelize.col('title')})
        .then(notableIdeas => res.send(notableIdeas))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving notableIdeas.`
            });
        })
};

export const findById = (req, res) => {
    NotableIdea.findOne({where: {id: req.params.id}})
        .then(notableIdea => res.send(notableIdea))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notableIdea with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving notableIdea with id " + ${req.params.id}`
                });
            }
        });
};

export const findByAuthor = async (req, res) => {
    const author = await Author.findOne({where: {id: req.params.authorid}});
    if (!author) {
        res.status(404).send({
            message: `Author not found.`
        });
    } else {
        author.getNotableIdeas()
            .then(notableIdeas => res.send(notableIdeas))
            .catch(err => {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found notableIdea.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving notableIdea.`
                    });
                }
            });
    }
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "NotableIdea can not be empty!"
        });
    }

    NotableIdea.update(req.body, {where: {id: req.params.id}})
        .then(() => {
            NotableIdea.findOne({where: {id: req.params.id}})
                .then(notableIdea => res.send(notableIdea))
        })
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notableIdea.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating notableIdea`
                });
            }
        })
};

export const deleteOne = (req, res) => {
    NotableIdea.destroy({where: {id: req.params.id}})
        .then(() => res.send({message: `NotableIdea was deleted successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notableIdea.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete notableIdea`
                });
            }
        });
};
