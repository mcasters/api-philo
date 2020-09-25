import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Author from "./Author";

const School = sequelize.define(
    'school',
    {
        title: DataTypes.TEXT,
    },
);

School.belongsToMany(Author, { through: 'AuthorSchools' });

School.sync();

export default School;
