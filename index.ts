import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { responseFormatter } from "./src/middlewares/responseFormatter";
import morgan from "morgan";
import { addRoutes } from "./src/config/routes.config";

const app: Express = express();

dotenv.config({ path: './config.env' });

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(responseFormatter);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

addRoutes(app);

async function bootstrap() {
    if (!process.env.DATABASE_CONNECTION_STRING || !process.env.DATABASE_NAME || !process.env.PORT) {
        throw new Error("Can not read evironment variable");
        process.exit(1);
    }

    try {
        await mongoose.connect(
            process.env.DATABASE_CONNECTION_STRING,
            {
                dbName: process.env.DATABASE_NAME,
            }
        );
        console.log("Connected to MongoDB");
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

bootstrap();
