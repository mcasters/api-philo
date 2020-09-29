import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";

const School = sequelize.define(
    'school',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
);

School.sync();

export default School;
