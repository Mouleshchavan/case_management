import axios from 'axios';
import csvParser from 'csv-parser';
import { Agent } from 'http';
import { Readable } from 'stream';
import { logger } from '../utils/logger'; 
import { CaseService } from './caseService'; 

export class ImportService {
    private caseService = new CaseService();

    public async importData() {
        // Correct Google Sheets CSV export URL
        const url = 'https://docs.google.com/spreadsheets/d/1DT5x2YhTxCNWzRyEjtKf5dtiX7mrZsP7CCg6KHme4HA/export?format=csv';
        let dataFetched = false;
        let dataStream: Readable | null = null;

        while (!dataFetched) {
            try {
                const response = await axios.get(url, {
                    responseType: 'stream', // Use 'stream' to handle large files
                    httpAgent: new Agent({ family: 4 }) // Force IPv4
                });
                dataStream = response.data as Readable;
                dataFetched = true; // Mark as successful
                logger.info('Data fetched successfully');
            } catch (error) {
                logger.error('Failed to fetch data. Retrying...', { error: error });
                await this.wait(5000);
            }
        }

        if (dataStream) {
            const parser = csvParser();

            parser.on('data', async (row) => {
                try {
                    const bankName = this.sanitize(row['Bank name']);
                    const propertyName = this.sanitize(row['Property name']);
                    const city = this.sanitize(row['City']);
                    const borrowerName = this.sanitize(row['Borrower name']);
                    const createdAt = row['Created At'] ? new Date(row['Created At']) : null;

                    // Validate createdAt to ensure it's a valid date
                    const isValidDate = createdAt !== null && !isNaN(createdAt.getTime());
                    
                    if (!isValidDate) {
                        // logger.warn('Skipping row due to invalid date', { row });
                        return; // Skip this row
                    }

                    // Save the case to the database
                    await this.caseService.addCase({ 
                        bankName: bankName || '', 
                        propertyName: propertyName || '', 
                        city: city || '', 
                        borrowerName: borrowerName || '', 
                        createdAt 
                    });
                    // console.log({ bankName, propertyName, city, borrowerName, createdAt });

                } catch (error) {
                    logger.error('Error processing row', { error: error, row });
                }
            });

            parser.on('end', () => {
                logger.info('All data processed successfully');
            });

            dataStream.pipe(parser);
        }
    }

    private sanitize(value: string | undefined): string | null {
        if (typeof value === 'string') {
            return value.replace(/<\/?[^>]+(>|$)/g, '').trim();
        }
        return null;
    }

    private wait(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
