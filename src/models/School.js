import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Author from "./Author";

const School = sequelize.define(
    'school',
    {
        title: DataTypes.TEXT,
    },
);

School.hasMany(Author)

School.sync();

export default School;
