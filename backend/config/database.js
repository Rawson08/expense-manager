const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false, // Disable logging for cleaner output
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL database.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { sequelize, connectDB };