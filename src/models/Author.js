import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import NotableIdea from "./NotableIdea";
import School from "./School";
import Work from "./Work";

const Author = sequelize.define(
    'Author',
    {
        firstName: DataTypes.TEXT,
        lastName: DataTypes.TEXT,
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        date_of_death: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        }
    }
);

Author.hasMany(NotableIdea);
Author.hasMany(Work);
Author.belongsToMany(School, { through: 'AuthorSchools' });

Author.sync();

export default Author;
