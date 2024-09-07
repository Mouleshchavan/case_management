import { Case, CaseModel } from '../models/caseModel';

export class CaseService {
    public async addCase(caseData: Partial<Case>): Promise<Case> {
        if (!caseData.bankName || !caseData.propertyName || !caseData.city || !caseData.borrowerName) {
            throw new Error('Missing required case data');
        }

        const newCase = new CaseModel(caseData);
        try {
            return await newCase.save();
        } catch (error) {
            throw new Error(`Error saving case: ${error}`);
        }
    }

    public async getCases(filters: Partial<Case>, page: number, limit: number): Promise<{ cases: Case[], total: number }> {
        try {
            const cases = await CaseModel.find(filters)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();

            const total = await CaseModel.countDocuments(filters).exec();

            return { cases, total };
        } catch (error) {
            throw new Error(`Error retrieving cases: ${error}`);
        }
    }
}
