import schedule from 'node-schedule';
import { ImportService } from '../services/importService';

const importService = new ImportService();

export const scheduleDataImport = () => {
    schedule.scheduleJob('0 10 * * *', async () => {
        try {
            await importService.importData();
            console.log('Data import successful at 10 AM');
        } catch (error) {
            console.error('Error importing data at 10 AM:', error);
        }
    });

    schedule.scheduleJob('0 17 * * *', async () => {
        try {
            await importService.importData();
            console.log('Data import successful at 5 PM');
        } catch (error) {
            console.error('Error importing data at 5 PM:', error);
        }
    });
};
