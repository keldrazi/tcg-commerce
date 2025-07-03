import { Injectable,  } from '@nestjs/common';
import { UtilPDFService } from 'src/system/modules/util/pdf/util.pdf.service';


@Injectable()
export class ImportServiceTCGPlayerService {

    constructor(
        private utilPDFService: UtilPDFService,
    ) {}

    async processImport(importFile: Express.Multer.File) {

    }
    
}


