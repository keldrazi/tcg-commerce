import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceUpdatePriceJobService } from './inventory.product.card.service.update.price.job.service';
import { InventoryProductCardServiceUpdatePriceJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/dto/inventory.product.card.service.update.price.job.dto';


@Controller('inventory/product/card/service/create/job')
export class InventoryProductCardServiceUpdatePriceJobController {

    constructor(
        private inventoryProductCardServiceUpdatePriceJobService: InventoryProductCardServiceUpdatePriceJobService,
    ) { }
    
    @Get('all/:commerceAccountId')
    async getInventoryProductCardServiceUpdatePriceJobsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.getInventoryProductCardServiceUpdatePriceJobsByCommerceAccountId(commerceAccountId);

        return inventoryProductCardServiceUpdatePriceJobDTO;
    }

    @Get('all/:commerceAccountId/:productLineCode')
    async getInventoryProductCardServiceUpdatePriceJobsByCommerceAccountIdAndProductLineCode(@Param('commerceAccountId') commerceAccountId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.getInventoryProductCardServiceUpdatePriceJobsByCommerceAccountIdAndProductLineCode(commerceAccountId, productLineCode);

        return inventoryProductCardServiceUpdatePriceJobDTO;
    }

    @Get('all/location/:commerceLocationId')
    async getInventoryProductCardServiceUpdatePriceJobsByCommerceLocationId(@Param('commerceLocationId') commerceLocationId: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.getInventoryProductCardServiceUpdatePriceJobsByCommerceLocationId(commerceLocationId);
        
        return inventoryProductCardServiceUpdatePriceJobDTO;
    }

    @Get('all/location/:commerceLocationId/:productLineCode')
    async getInventoryProductCardServiceUpdatePriceJobsByCommerceLocationIdAndProductLineCode(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.getInventoryProductCardServiceUpdatePriceJobsByCommerceLocationIdAndProductLineCode(commerceLocationId, productLineCode);
        
        return inventoryProductCardServiceUpdatePriceJobDTO;
    }

    @Post('all')
    async createInventoryProductCardServiceJobs(@Body() body: any)
    {
        let inventoryProductCardServiceUpdatePriceJobDTOs = await this.inventoryProductCardServiceUpdatePriceJobService.createInventoryProductCardServiceUpdatePriceJobs(body.createInventoryProductCardServiceUpdatePriceJobsDTO);

        return inventoryProductCardServiceUpdatePriceJobDTOs;
    }
    
    @Post('set')
    async createInventoryProductCardServiceUpdatePriceJobSet(@Body() body: any)
    {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.createInventoryProductCardServiceUpdatePriceJobSet(body.createInventoryProductCardServiceUpdatePriceJobDTO);

        return inventoryProductCardServiceUpdatePriceJobDTO;
    }

    /*@Get('process/all/:commerceLocationId/:productLineCode')
    async processInventoryProductCardServiceUpdatePriceJobs(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.processInventoryProductCardServiceUpdatePriceJobs(commerceLocationId, productLineCode);
        
        return inventoryProductCardServiceUpdatePriceJobDTO;
    }
    */

    @Get('process/:inventoryProductCardServiceUpdatePriceJobId')
    async processInventoryProductCardServiceUpdatePriceJobById(@Param('inventoryProductCardServiceUpdatePriceJobId') inventoryProductCardServiceUpdatePriceJobId: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.processsInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId);
        
        return inventoryProductCardServiceUpdatePriceJobDTO;
    }
    

    @Get('review/:inventoryProductCardServiceUpdatePriceJobId')
    async reviewInventoryProductCardServiceUpdatePriceJobById(@Param('inventoryProductCardServiceUpdatePriceJobId') inventoryProductCardServiceUpdatePriceJobId: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.getInventoryProductCardServiceUpdatePriceJobDetailsById(inventoryProductCardServiceUpdatePriceJobId);

        return inventoryProductCardServiceUpdatePriceJobDTO;
    }

    @Get('approve/:inventoryProductCardServiceUpdatePriceJobId')
    async approveInventoryProductCardServiceUpdatePriceJobById(@Param('inventoryProductCardServiceUpdatePriceJobId') inventoryProductCardServiceUpdatePriceJobId: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.approveInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId);
        
        return inventoryProductCardServiceUpdatePriceJobDTO;
    }

    @Get('delete/:inventoryProductCardServiceUpdatePriceJobId')
    async deleteInventoryProductCardServiceUpdatePriceJobById(@Param('inventoryProductCardServiceUpdatePriceJobId') inventoryProductCardServiceUpdatePriceJobId: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.deleteInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId);
        
        return inventoryProductCardServiceUpdatePriceJobDTO;
    }
        


}