import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Author from "./Author";
import Quote from "./Quote";

const Works = sequelize.define(
    'works',
    {
        title: DataTypes.TEXT,
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    }
);

Works.hasOne(Author);
Works.hasMany(Quote);

Works.sync();

export default Works;
