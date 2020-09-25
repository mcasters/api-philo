import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Author from "./Author";
import Quote from "./Quote";

const Work = sequelize.define(
    'works',
    {
        title: DataTypes.TEXT,
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    }
);

Work.belongsTo(Author);
Work.hasMany(Quote);

Work.sync();

export default Work;
