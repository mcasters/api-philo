import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Topic from "./Topic";

const Quote = sequelize.define(
    'quote',
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

Quote.belongsToMany(Topic, { through: 'quote_topics' });
Topic.belongsToMany(Quote, { through: 'quote_topics' });

Quote.sync();

export default Quote;
