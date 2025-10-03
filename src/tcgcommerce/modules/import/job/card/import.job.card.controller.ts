import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ImportJobCardService } from './import.job.card.service';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('import/job/card')
export class ImportJobCardController {

    constructor(
        private importJobCardService: ImportJobCardService,
    ) { }
    /*
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createImportJob(
        @Body() body: any,
        @UploadedFile(
        new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ],
        }),
        )
        importJobFile: Express.Multer.File,
        
    ) {

        let importJobCode = await this.importJobCardService.createImportJob(importJobFile, body.createImportJobDTO);

        return importJobCode;
    }
        */

    //GET ALL IMPORT JOBS FOR A COMMERCE ACCOUNT;
    //REVIEW IMPORT JOB
    //REJECT IMPORT JOB
    //APPROVE IMPORT JOB
    

}