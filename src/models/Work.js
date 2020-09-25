import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Quote from "./Quote";

const Work = sequelize.define(
    'Works',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    }
);

Quote.belongsTo(Work);
Work.hasMany(Quote);

// Work.sync();

export default Work;
