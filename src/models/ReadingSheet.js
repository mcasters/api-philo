import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Quote from "./Quote";
import Work from "./Work";

const ReadingSheet = sequelize.define(
    'readingsheet',
    {
        html_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
    }
);

ReadingSheet.hasMany(Quote, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Quote.belongsTo(ReadingSheet);

ReadingSheet.sync();

export default ReadingSheet;
