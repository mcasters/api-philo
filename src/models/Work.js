import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Quote from "./Quote";
import ReadingSheet from "./ReadingSheet";

const Work = sequelize.define(
    'work',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
);

Work.hasOne(ReadingSheet, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
ReadingSheet.belongsTo(Work);

Work.sync();

export default Work;
