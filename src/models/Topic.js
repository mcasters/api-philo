import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Quote from "./Quote";

const Topic = sequelize.define(
    'topic',
    {
        text: DataTypes.TEXT,
    }
);

Topic.belongsToMany(Quote, { through: 'QuoteTopics' });

Topic.sync();

export default Topic;
