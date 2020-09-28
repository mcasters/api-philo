import Sequelize from 'sequelize';

import Quote from '../models/Quote';
import Work from "../models/Work";

export const create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Quote can not be empty!"
        });
    }

    const work = await Work.findOne({where: {id: req.body.workId}});
    if (!work) {
        res.status(404).send({
            message: `Work not found.`
        });
    } else {
        work.createQuote({text: req.body.text, part: req.body.part })
            .then(quote => res.send(quote))
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Some error occurred while creating the quote.`
                });
            });
    }
};

export const findAll = (req, res) => {
    Quote.findAll({order: Sequelize.col('text')})
        .then(quotes => res.send(quotes))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving quotes.`
            });
        })
};

export const findById = (req, res) => {
    Quote.findOne({where: {id: req.params.id}})
        .then(quote => res.send(quote))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found quote with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving quote with id " + ${req.params.id}`
                });
            }
        });
};

export const findByWork = async (req, res) => {
    const work = await Work.findOne({where: {id: req.params.workid}});
    if (!work) {
        res.status(404).send({
            message: `Work not found.`
        });
    } else {
        console.log(work);
        work.getQuotes()
            .then(quotes => res.send(quotes))
            .catch(err => {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found quote.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving quote.`
                    });
                }
            });
    }
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Quote can not be empty!"
        });
    }

    Quote.update(req.body, {where: {id: req.params.id}})
        .then(() => {
            Quote.findOne({where: {id: req.params.id}})
                .then(quote => res.send(quote))
        })
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found quote.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating quote`
                });
            }
        })
};

export const deleteOne = (req, res) => {
    Quote.destroy({where: {id: req.params.id}})
        .then(() => res.send({message: `Quote was deleted successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found quote.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete quote`
                });
            }
        });
};