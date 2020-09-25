import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import NotableIdea from "./NotableIdea";
import School from "./School";
import Work from "./Work";

const Author = sequelize.define(
    'Author',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        dateOfDeath: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        }
    }
);

Author.hasMany(NotableIdea);
Author.hasMany(Work);

Work.belongsTo(Author);
NotableIdea.belongsTo(Author);

Author.belongsToMany(School, { through: 'AuthorSchools' });
School.belongsToMany(Author, { through: 'AuthorSchools' });

// Author.sync();

export default Author;
