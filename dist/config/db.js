"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.MONGO_URI);
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
