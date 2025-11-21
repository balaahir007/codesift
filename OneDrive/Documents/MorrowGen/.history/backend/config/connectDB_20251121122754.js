import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.RENDER_DATABASE_URL || "postgres://postgres:Balaji123@localhost:5433/morrowgen",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.RENDER_DATABASE_URL
        ? { require: true, rejectUnauthorized: false }
        : false,
    },
    logging: false,
  }
);


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected Successfully");
  } catch (error) {
    console.error("❌ PostgreSQL Connection failed:", error);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;
