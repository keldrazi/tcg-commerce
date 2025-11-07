import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceImportJobService } from './inventory.product.card.service.import.job.service';
import { InventoryProductCardServiceImportJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/dto/inventory.product.card.service.import.job.dto';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('inventory/product/card/service/import/job')
export class InventoryProductCardServiceImportJobController {

    constructor(
        private inventoryProductCardServiceImportJobService: InventoryProductCardServiceImportJobService,
    ) { }
    
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createInventoryProductCardServiceImportJob(
        @Body() body: any,
        @UploadedFile(
        new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ],
        }),
        )
        inventoryProductCardServiceImportJobFile: Express.Multer.File,
        
    ) {

        let inventoryProductCardServiceImportJobCode = await this.inventoryProductCardServiceImportJobService.createInventoryProductCardServiceImportJob(inventoryProductCardServiceImportJobFile, body.createInventoryProductCardServiceImportJobDTO);

        return inventoryProductCardServiceImportJobCode;
    }
        

    //GET ALL IMPORT JOBS FOR A COMMERCE ACCOUNT;
    //REVIEW IMPORT JOB
    //REJECT IMPORT JOB
    //APPROVE IMPORT JOB


}