import { DataTypes } from 'sequelize';
import sequelize from "../config/sequelize";

const NotableIdea = sequelize.define('notableIdea', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

NotableIdea.sync();

export default NotableIdea;
