"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCasesByCity = void 0;
const caseService_1 = require("../services/caseService");
const caseService = new caseService_1.CaseService();
const getCasesByCity = async (req, res) => {
    try {
        const { city } = req.params;
        const { startDate, endDate } = req.query;
        const cases = await caseService.getCasesByCity(city, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
        res.json(cases);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cases' });
    }
};
exports.getCasesByCity = getCasesByCity;
