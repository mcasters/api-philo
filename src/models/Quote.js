import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Works from "./Works";

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

Quote.hasOne(Works);

Quote.sync();

export default Quote;
