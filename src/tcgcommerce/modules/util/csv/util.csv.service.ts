import { Injectable } from '@nestjs/common';
import * as Papa from 'papaparse';


@Injectable()
export class UtilCSVService {

    constructor() {}

    async parseCSV(file: Express.Multer.File) {
        const dataString = file.buffer.toString('utf-8');
        return new Promise((resolve, reject) => { 
            Papa.parse(dataString, { 
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if(results.errors.length > 0) {
                        reject(results.errors);
                    } else {
                        resolve(results.data);
                    }
                }
            });
        });
    }
}


