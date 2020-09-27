import Sequelize from 'sequelize';

module.exports = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST || 'localhost',
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            timestamps: false,
        },
    },
);


