import Sequelize from 'sequelize';

import Author from '../models/Author';
import School from "../models/School";
import NotableIdea from "../models/NotableIdea";
import Work from "../models/Work";

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
    Author.findAll({
        order: Sequelize.col('date_of_birth'),
        include: [School, Work, NotableIdea],
    })
        .then(authors => res.send(authors))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving authors.`
            });
        })
};

export const findById = (req, res) => {
    Author.findOne({
        where: {id: req.params.id},
        include: [School, Work, NotableIdea],
    })
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

export const findBySchool = async (req, res) => {
    const school = await School.findOne({where: {id: req.params.schoolid}});
    if (!school) {
        res.status(404).send({
            message: `School not found.`
        });
    } else {
        school.getAuthors({ include: [School, Work, NotableIdea] })
            .then(authors => res.send(authors))
            .catch(err => {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Authors Not found.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving authors.`
                    });
                }
            });
    }
};

export const findByName = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Author name can not be empty!"
        });
    }

    Author.findOne({
        where: {lastname: `${req.body.lastname}`},
        include: [School, Work, NotableIdea],
    })
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

export const removeSchool = async (req, res) => {
    if (!req.body)
        res.status(400).send({message: "Schoolid can not be empty!"});

    const author = await Author.findOne({where: {id: req.params.id}});
    if (!author)
        res.status(400).send({message: "Author not found"});

    const schoolToRemove = await author.getSchools({where: {id: req.body.schoolid}})
    author.removeSchool(schoolToRemove)
        .then(() => res.send({message: `School was removed successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `School not found.`
                });
            } else {
                res.status(500).send({
                    message: err.message || `Could not remove school`
                });
            }
        });
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
