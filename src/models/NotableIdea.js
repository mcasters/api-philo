import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";
import Author from "./Author";


const NotableIdea = sequelize.define('notable_idea', {
  text: DataTypes.TEXT,
});

NotableIdea.hasOne(Author);

NotableIdea.sync();

export default NotableIdea;
