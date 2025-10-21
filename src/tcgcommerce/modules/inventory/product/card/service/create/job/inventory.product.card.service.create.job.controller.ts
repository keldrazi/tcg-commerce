import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceCreateJobService } from './inventory.product.card.service.create.job.service';
import { InventoryProductCardServiceCreateJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/dto/inventory.product.card.service.create.job.dto';


@Controller('inventory/product/card/service/create/job')
export class InventoryProductCardServiceCreateJobController {

    constructor(
        private inventoryProductCardServiceCreateJobService: InventoryProductCardServiceCreateJobService,
    ) { }
    
    /*
    @Post('create/all')
    async createInventoryBatchLoadJobsProductCard(@Body() body: any)
    {
        let inventoryBatchLoadJobProductCardDTO = await this.InventoryProductCardServiceCreateJobService.createInventoryBatchLoadJobProductCardAll(body.createInventoryBatchLoadJobsProductCardDTO);

        return inventoryBatchLoadJobProductCardDTO;
    }
    /*
    @Post('create/set')
    async createInventoryBatchLoadJobProductCard(@Body() body: any)
    {
        let inventoryBatchLoadJobProductCardDTO = await this.InventoryProductCardServiceCreateJobService.createInventoryBatchLoadJobProductCardSet(body.createInventoryBatchLoadJobProductCardDTO);
        
        return inventoryBatchLoadJobProductCardDTO;
    }

    /*
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
        */


}