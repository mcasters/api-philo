import Sequelize from 'sequelize';

import School from '../models/School';
import Author from "../models/Author";

export const create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "School can not be empty!"
        });
    }

    School.create({title: req.body.title})
        .then(school => res.send(school))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the school.`
            });
        });
};

export const setOrCreateByAuthor = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "School can not be empty!"
        });
    }
    let school;

    const author = await Author.findOne({where: {id: req.params.authorid}});
    if (!author) {
        res.status(404).send({
            message: `Author not found.`
        });
    } else {
        school = await School.findOne({where: {title: req.body.title}});
        if (!school) {
            school = await School.create({title: req.body.title})
        }
    }

    author.addSchool(school)
        .then(() => res.send(school))
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error associated school to author.`
            });
        });
};

export const findAll = (req, res) => {
    School.findAll({order: Sequelize.col('title')})
        .then(schools => res.send(schools))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving schools.`
            });
        })
};

export const findById = (req, res) => {
    School.findOne({where: {id: req.params.id}})
        .then(school => res.send(school))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found school with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving school with id " + ${req.params.id}`
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
        author.getSchools()
            .then(schools => res.send(schools))
            .catch(err => {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found school.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving school.`
                    });
                }
            });
    }
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "School can not be empty!"
        });
    }

    School.update(req.body, {where: {id: req.params.id}})
        .then(() => {
            School.findOne({where: {id: req.params.id}})
                .then(school => res.send(school))
        })
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found school.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating school`
                });
            }
        })
};

export const deleteOne = (req, res) => {
    School.destroy({where: {id: req.params.id}})
        .then(() => res.send({message: `School was deleted successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found school.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete school`
                });
            }
        });
};
