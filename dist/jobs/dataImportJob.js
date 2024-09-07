"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleDataImport = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const importService_1 = require("../services/importService");
const importService = new importService_1.ImportService();
const scheduleDataImport = () => {
    node_schedule_1.default.scheduleJob('0 10,17 * * *', async () => {
        await importService.importData(process.env.GOOGLE_DOCS_CSV_URL);
    });
};
exports.scheduleDataImport = scheduleDataImport;
