import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryBatchLoadJobProductCardService } from './inventory.batch.load.job.product.card.service';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('inventory/batch/load/job/product/card')
export class InventoryBatchLoadJobProductCardController {

    constructor(
        private inventoryLoadJobCardService: InventoryBatchLoadJobProductCardService,
    ) { }
    
    @Post()
    async createInventoryBatchLoadJobProductCard(@Body() body: any)
    {
        let inventoryLoadJobCardDTO = await this.inventoryLoadJobCardService.createInventoryBatchLoadJobProductCard(body.createInventoryBatchLoadJobProductCardDTO);
        
        return inventoryLoadJobCardDTO;
    }

       
}