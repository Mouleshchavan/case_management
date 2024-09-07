import { Request, Response } from 'express';
import { CaseService } from '../services/caseService';

const caseService = new CaseService();

export const getCases = async (req: Request, res: Response) => {
    try {
        const filters: any = {};

        // Apply filters if they are provided in the query params
        if (req.query.bankName) filters.bankName = req.query.bankName;
        if (req.query.propertyName) filters.propertyName = req.query.propertyName;
        if (req.query.city) filters.city = req.query.city;
        if (req.query.borrowerName) filters.borrowerName = req.query.borrowerName;
        if (req.query.startDate) filters.createdAt = { $gte: new Date(req.query.startDate as string) };
        if (req.query.endDate) filters.createdAt = { ...filters.createdAt, $lte: new Date(req.query.endDate as string) };

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { cases, total } = await caseService.getCases(filters, page, limit);

        res.json({
            cases,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cases' });
    }
};
