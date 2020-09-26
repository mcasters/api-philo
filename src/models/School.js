import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";

const School = sequelize.define(
    'School',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
);

School.sync();

export default School;
