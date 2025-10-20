import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryBatchLoadJobProductCardService } from './inventory.product.card.service.create.job.service';
import { InventoryBatchLoadJobProductCardDTO } from "src/tcgcommerce/modules/inventory/batch/load/job/product/card/dto/inventory.batch.load.job.product.card.dto";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('inventory/batch/load/job/product/card')
export class InventoryBatchLoadJobProductCardController {

    constructor(
        private inventoryLoadJobCardService: InventoryBatchLoadJobProductCardService,
    ) { }
    
    @Post('create/all')
    async createInventoryBatchLoadJobsProductCard(@Body() body: any)
    {
        let inventoryBatchLoadJobProductCardDTO = await this.inventoryLoadJobCardService.createInventoryBatchLoadJobProductCardAll(body.createInventoryBatchLoadJobsProductCardDTO);

        return inventoryBatchLoadJobProductCardDTO;
    }

    @Post('create/set')
    async createInventoryBatchLoadJobProductCard(@Body() body: any)
    {
        let inventoryBatchLoadJobProductCardDTO = await this.inventoryLoadJobCardService.createInventoryBatchLoadJobProductCardSet(body.createInventoryBatchLoadJobProductCardDTO);
        
        return inventoryBatchLoadJobProductCardDTO;
    }

    @Get('all/:commerceAccountId')
    async getInventoryBatchLoadJobProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        let inventoryBatchLoadJobProductCardDTO = await this.inventoryLoadJobCardService.getInventoryBatchLoadJobProductCardsByCommerceAccountId(commerceAccountId);
        
        return inventoryBatchLoadJobProductCardDTO;
    }

    @Get('location/:commerceLocationId')
    async getInventoryBatchLoadJobProductCardsByLocation(@Param('commerceLocationId') commerceLocationId: string) {
        let inventoryBatchLoadJobProductCardDTO = await this.inventoryLoadJobCardService.getInventoryBatchLoadJobProductCardsByCommerceLocationId(commerceLocationId);
        
        return inventoryBatchLoadJobProductCardDTO;
    }

    @Get('review/:inventoryBatchLoadJobProductCardId')
    async getInventoryBatchLoadJobProductCardDetailsById(@Param('inventoryBatchLoadJobProductCardId') inventoryBatchLoadJobProductCardId: string) {
        let inventoryBatchLoadJobProductCardDTO = await this.inventoryLoadJobCardService.getInventoryBatchLoadJobProductCardDetailsById(inventoryBatchLoadJobProductCardId);
        
        return inventoryBatchLoadJobProductCardDTO;
    }

    @Get('approve/:inventoryBatchLoadJobProductCardId')
    async approveInventoryBatchLoadJobProductCardDetailsById(@Param('inventoryBatchLoadJobProductCardId') inventoryBatchLoadJobProductCardId: string) {
        let inventoryBatchLoadJobProductCardDTO = await this.inventoryLoadJobCardService.approveInventoryBatchLoadJobProductCardDetailsById(inventoryBatchLoadJobProductCardId);
        
        return inventoryBatchLoadJobProductCardDTO;
    }


}