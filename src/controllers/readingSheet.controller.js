import Sequelize from 'sequelize';

import ReadingSheet from '../models/ReadingSheet';
import Work from '../models/Work';

export const create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "ReadingSheet can not be empty!"
        });
    }

    const work = await Work.findOne({where: {id: req.body.workid}});
    if (!work) {
        res.status(404).send({
            message: `Work not found.`
        });
    } else {
        work.createReadingsheet({html_text: req.body.html_text, date: req.body.date})
            .then(readingSheet => res.send(readingSheet))
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while creating the readingSheet.`
                });
            });
    }
};

export const findAll = (req, res) => {
    ReadingSheet.findAll({
        order: Sequelize.col('date'),
        include: Work
    })
        .then(readingSheets => res.send(readingSheets))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving readingSheets.`
            });
        })
};

export const findById = (req, res) => {
    ReadingSheet.findOne({
        where: {id: req.params.id},
        include: Work
    })
        .then(readingSheet => res.send(readingSheet))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found readingSheet with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving readingSheet with id " + ${req.params.id}`
                });
            }
        });
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "ReadingSheet can not be empty!"
        });
    }

    ReadingSheet.update(req.body, {where: {id: req.params.id}})
        .then(() => {
            ReadingSheet.findOne({where: {id: req.params.id}})
                .then(readingSheet => res.send(readingSheet))
        })
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found readingSheet.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating readingSheet`
                });
            }
        })
};

export const deleteOne = (req, res) => {
    ReadingSheet.destroy({where: {id: req.params.id}})
        .then(() => res.send({message: `ReadingSheet was deleted successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found readingSheet.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete readingSheet`
                });
            }
        });
};
