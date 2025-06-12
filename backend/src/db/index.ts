import { Sequelize } from "sequelize";
import dotenv from "dotenv";



dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT),
    logging: false,
    define: {
        freezeTableName: true, 
      },
})
import "../api/models/relations"; 

export async function checkConnection(): Promise<void>  {
    try {
        await sequelize.authenticate()
        console.log('Connection to DB has been established successfully')

    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Unknown error", error);
        }
      }
      
}

