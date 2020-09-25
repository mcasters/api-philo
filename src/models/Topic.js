import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";

const Topic = sequelize.define(
    'Topic',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
);

// Topic.sync();

export default Topic;
