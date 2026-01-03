import {Sequelize} from "sequelize";
import "dotenv/config.js";
import process from "process";

// Create Sequelize instance
const sequelize = new Sequelize("postgres", process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 6543,
  dialect: "postgres",
  logging: false,
  pool: {
    maxUses: 20
  }
});

export default sequelize;
