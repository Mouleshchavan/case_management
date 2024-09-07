"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseService = void 0;
const caseModel_1 = require("../models/caseModel");
class CaseService {
    async addCase(caseData) {
        const newCase = new caseModel_1.CaseModel(caseData);
        return await newCase.save();
    }
    async getCasesByCity(city, startDate, endDate) {
        const query = { city };
        if (startDate)
            query.createdAt = { $gte: startDate };
        if (endDate)
            query.createdAt = { $lte: endDate };
        return await caseModel_1.CaseModel.find(query).exec();
    }
}
exports.CaseService = CaseService;
