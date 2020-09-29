import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import NotableIdea from "./NotableIdea";
import School from "./School";
import Work from "./Work";

const Author = sequelize.define(
    'author',
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING
        },
        fullname: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstname} ${this.lastname}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullname` value!');
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

Author.hasMany(NotableIdea, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
NotableIdea.belongsTo(Author);

Author.hasMany(Work, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Work.belongsTo(Author);

Author.belongsToMany(School, { through: 'author_schools' });
School.belongsToMany(Author, { through: 'author_schools' });

Author.sync();

export default Author;
