import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "../db";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import transactionRoutes from './routers/transactionRoutes';
import userRoutes from './routers/userRoutes';
import accountRoutes from './routers/accountRoutes';
import currencieRoutes from './routers/currencieRoutes';
import { checkConnection } from "../db";



async function connectDB(): Promise<void> {
  await checkConnection();
    await sequelize.sync({ alter: true }); 
    console.log("📦 Base de datos sincronizada");
}

function launchServer(): void {
  const app = express();

  app
    .use(cors())
    .use(morgan("dev"))
    .use(express.json())
    .use("/api/transactions", transactionRoutes)
    .use("/api/users", userRoutes)
    .use("/api/accounts", accountRoutes)
    .use("/api/currencies", currencieRoutes)
    .listen(process.env.PORT || 3000, () =>
      console.log(`🚀 Server listening on port ${process.env.PORT || 3000}`)
    );
}

async function startApi(): Promise<void> {
  await connectDB();
  launchServer();
}

startApi();
