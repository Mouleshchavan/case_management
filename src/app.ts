import express from 'express';
import dotenv from 'dotenv';
import caseRoutes from './routes/caseRoutes';
import { connectDB } from './config/db';
import { scheduleDataImport } from './jobs/dataImportJob';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', caseRoutes);

connectDB();
scheduleDataImport();

export default app;
