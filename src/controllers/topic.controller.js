import Sequelize from 'sequelize';

import Topic from '../models/Topic';
import Quote from "../models/Quote";

export const create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Topic can not be empty!"
        });
    }

    Topic.create({title: req.body.title})
        .then(topic => res.send(topic))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the topic.`
            });
        });
};

export const setOrCreateByQuote = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Topic can not be empty!"
        });
    }
    let topic;

    const quote = await Quote.findOne({where: {id: req.params.quoteid}});
    if (!quote) {
        res.status(404).send({
            message: `Quote not found.`
        });
    } else {
        topic = await Topic.findOne({where: {title: req.body.title}});
        if (!topic) {
            topic = await Topic.create({title: req.body.title})
        }
    }

    quote.addTopic(topic)
        .then(() => res.send(topic))
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error associated topic to quote.`
            });
        });
};

export const findAll = (req, res) => {
    Topic.findAll({order: Sequelize.col('title')})
        .then(topics => res.send(topics))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving topics.`
            });
        })
};

export const findById = (req, res) => {
    Topic.findOne({where: {id: req.params.id}})
        .then(topic => res.send(topic))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found topic with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving topic with id " + ${req.params.id}`
                });
            }
        });
};

export const findByQuote = async (req, res) => {
    const quote = await Quote.findOne({where: {id: req.params.quoteid}});
    if (!quote) {
        res.status(404).send({
            message: `Quote not found.`
        });
    } else {
        quote.getTopics()
            .then(topics => res.send(topics))
            .catch(err => {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found topic.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving topic.`
                    });
                }
            });
    }
};

export const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Topic can not be empty!"
        });
    }

    Topic.update(req.body, {where: {id: req.params.id}})
        .then(() => {
            Topic.findOne({where: {id: req.params.id}})
                .then(topic => res.send(topic))
        })
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found topic.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating topic`
                });
            }
        })
};

export const deleteOne = (req, res) => {
    Topic.destroy({where: {id: req.params.id}})
        .then(() => res.send({message: `Topic was deleted successfully!`}))
        .catch(err => {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found topic.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete topic`
                });
            }
        });
};
