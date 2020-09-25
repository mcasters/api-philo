import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Work from "./Work";
import Topic from "./Topic";

const Quote = sequelize.define(
    'quote',
    {
        text: DataTypes.TEXT,
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    }
);

Quote.belongsTo(Work);
Quote.belongsToMany(Topic, { through: 'QuoteTopics' });

Quote.sync();

export default Quote;
