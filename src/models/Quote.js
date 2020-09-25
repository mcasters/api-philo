import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Topic from "./Topic";

const Quote = sequelize.define(
    'Quote',
    {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    }
);

Quote.belongsToMany(Topic, { through: 'QuoteTopics' });
Topic.belongsToMany(Quote, { through: 'QuoteTopics' });

// Quote.sync();

export default Quote;
