import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryBatchLoadJobProductCardService } from './inventory.batch.load.job.product.card.service';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('inventory/batch/load/job/product/card')
export class InventoryBatchLoadJobProductCardController {

    constructor(
        private inventoryLoadJobCardService: InventoryBatchLoadJobProductCardService,
    ) { }
    
    @Post('create/all')
    async createInventoryBatchLoadJobsProductCard(@Body() body: any)
    {
        let inventoryLoadJobCardDTO = await this.inventoryLoadJobCardService.createInventoryBatchLoadJobProductCardAll(body.createInventoryBatchLoadJobsProductCardDTO);
        
        return inventoryLoadJobCardDTO;
    }

    @Post('create/set')
    async createInventoryBatchLoadJobProductCard(@Body() body: any)
    {
        let inventoryLoadJobCardDTO = await this.inventoryLoadJobCardService.createInventoryBatchLoadJobProductCardSet(body.createInventoryBatchLoadJobProductCardDTO);
        
        return inventoryLoadJobCardDTO;
    }

    @Get(':inventoryBatchLoadJobProductCardId')
    async getInventoryBatchLoadJobProductCardDetailsById(@Param('inventoryBatchLoadJobProductCardId') inventoryBatchLoadJobProductCardId: string) {
        let inventoryLoadJobCardDTO = await this.inventoryLoadJobCardService.getInventoryBatchLoadJobProductCardDetailsById(inventoryBatchLoadJobProductCardId);
        return inventoryLoadJobCardDTO;
    }

    @Get('all/:commerceAccountId')
    async getInventoryBatchLoadJobProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        let inventoryLoadJobCardDTO = await this.inventoryLoadJobCardService.getInventoryBatchLoadJobProductCardsByCommerceAccountId(commerceAccountId);
        return inventoryLoadJobCardDTO;
    }

    @Get('location/:commerceLocationId')
    async getInventoryBatchLoadJobProductCardsByLocation(@Param('commerceLocationId') commerceLocationId: string) {
        let inventoryLoadJobCardDTO = await this.inventoryLoadJobCardService.getInventoryBatchLoadJobProductCardsByCommerceLocationId(commerceLocationId);
        return inventoryLoadJobCardDTO;
    }

}