"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const caseRoutes_1 = __importDefault(require("./routes/caseRoutes"));
const db_1 = require("./config/db");
const dataImportJob_1 = require("./jobs/dataImportJob");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', caseRoutes_1.default);
(0, db_1.connectDB)();
(0, dataImportJob_1.scheduleDataImport)();
exports.default = app;
