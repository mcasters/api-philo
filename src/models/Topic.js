import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Quote from "./Quote";

const Topic = sequelize.define(
    'topic',
    {
        text: DataTypes.TEXT,
    }
);

Topic.hasMany(Quote);

Topic.sync();

export default Topic;
