import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";

const Topic = sequelize.define(
    'topic',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
);

Topic.sync();

export default Topic;
