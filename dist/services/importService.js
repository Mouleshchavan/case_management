"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const axios_1 = __importDefault(require("axios"));
const caseService_1 = require("./caseService");
const logger_1 = require("../utils/logger");
class ImportService {
    constructor() {
        this.caseService = new caseService_1.CaseService();
    }
    async importData(url) {
        try {
            const response = await axios_1.default.get(url);
            const data = response.data; // assuming CSV format
            const rows = data.split('\n');
            for (const row of rows) {
                const [bankName, propertyName, city, borrowerName] = row.split(',');
                await this.caseService.addCase({
                    bankName,
                    propertyName,
                    city,
                    borrowerName,
                });
            }
            logger_1.logger.info('Data import successful');
        }
        catch (error) {
            logger_1.logger.error('Data import failed', error);
        }
    }
}
exports.ImportService = ImportService;
