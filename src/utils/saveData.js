import fs from 'fs'
import htmlGenerator from './htmlGenerator.js';

// Lodash
import isEmpty from 'lodash/isEmpty.js';


export default async (data, website) => {
    try {
        const title = `${website || 'unknown'}_output_data_${Date.now()}`;
        if (!isEmpty(data)) {
            await fs.promises.mkdir('src/output', { recursive: true });
            await fs.promises.writeFile(`src/output/${title}.json`, JSON.stringify(data, null, 2));
            await fs.promises.writeFile(`src/output/${title}.html`, htmlGenerator(data, website));
        }
    } catch (error) {
        throw error;
    }
};
