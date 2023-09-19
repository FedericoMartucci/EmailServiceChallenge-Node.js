import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { PrismaClient } from '@prisma/client';

const isTesting = process.env.NODE_ENV === 'test';

const PORT = process.env.PORT || 3001;
const app = express();
let db_url = process.env['DATABASE_URL'] as string;
const prisma = new PrismaClient({datasources:{db:{url:isTesting ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL}}});

app.use(cors());
app.use(express.json());
app.use(router);

const server = app.listen(PORT, (): void => console.log('Listening on port ' + PORT));
export { app, server };