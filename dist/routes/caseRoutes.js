"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const caseController_1 = require("../controllers/caseController");
const router = (0, express_1.Router)();
router.get('/cases/:city', caseController_1.getCasesByCity);
exports.default = router;
