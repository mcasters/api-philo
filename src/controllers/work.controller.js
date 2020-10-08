import Sequelize from 'sequelize';

import Work from '../models/Work';
import Author from "../models/Author";
import ReadingSheet from "../models/ReadingSheet";

export const create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Work can not be empty!"
        });
    }

    const author = await Author.findOne({where: {id: req.body.authorid}});
    if (!author) {
        res.status(404).send({
            message: `Author not found.`
        });
    } else {
        author.createWork({title: req.body.title, year: req.body.year })
            .then(work => res.send(work))
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while creating the work.`
                });
            });
    }
};

export const findAll = (req, res) => {
    Work.findAll({
        order: Sequelize.col('title'),
        include: [ReadingSheet],
    })
        .then(works => res.send(works))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving works.`
            });
        })
};

export const findById = (req, res) => {
    Work.findOne({
        where: {id: req.params.id},
        include: [ReadingSheet],
    })
        .then(work => res.send(work))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found work with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving work with id " + ${req.params.id}`
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
        author.getWorks({include: [ReadingSheet]})
            .then(works => res.send(works))
            .catch(err => {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found work.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving work.`
                    });
                }
            });
    }
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Work can not be empty!"
        });
    }

    Work.update(req.body, {where: {id: req.params.id}})
        .then(() => {
            Work.findOne({where: {id: req.params.id}})
                .then(work => res.send(work))
        })
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found work.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating work`
                });
            }
        })
};

export const deleteOne = (req, res) => {
    Work.destroy({where: {id: req.params.id}})
        .then(() => res.send({message: `Work was deleted successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found work.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete work`
                });
            }
        });
};
