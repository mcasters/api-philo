import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Quote from "./Quote";

const Work = sequelize.define(
    'work',
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

Work.hasMany(Quote, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Quote.belongsTo(Work);

Work.sync();

export default Work;
