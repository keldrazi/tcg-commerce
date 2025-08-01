import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ImportJobCardService } from './import.job.card.service';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('import/job/card')
export class ImportJobCardController {

    constructor(
        private importJobCardService: ImportJobCardService,
    ) { }
    
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
    
    /*
    @Get('/:commerceAccountId')
    async getCommerceAccount(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountService.getCommerceAccount(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createCommerceAccount(@Body() createCommerceAcountDTO: CreateCommerceAccountDTO) {
        return await this.commerceAccountService.createCommerceAccount(createCommerceAcountDTO);
    }

    /*
    @Put(':id')
    async updateUser(@Param('tcgDatabaseUserId') tcgDatabaseUserId: string, @Body() tcgDatabaseUserUpdateDTO: TCGDatabaseUserUpdateDTO) {
        await this.tcgDatabaseUserService.updateTCGDatabaseUser(tcgDatabaseUserId, tcgDatabaseUserUpdateDTO);
    }
    */

}