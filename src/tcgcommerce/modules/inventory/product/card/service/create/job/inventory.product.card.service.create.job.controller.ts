import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceCreateJobService } from './inventory.product.card.service.create.job.service';
import { InventoryProductCardServiceCreateJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/dto/inventory.product.card.service.create.job.dto';


@Controller('inventory/product/card/service/create/job')
export class InventoryProductCardServiceCreateJobController {

    constructor(
        private inventoryProductCardServiceCreateJobService: InventoryProductCardServiceCreateJobService,
    ) { }
    
    
    @Post('create/all')
    async createInventoryProductCardServiceJobs(@Body() body: any)
    {
        let inventoryProductCardServiceCreateJobDTOs = await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobs(body.createInventoryProductCardServiceCreateJobsDTO);

        return inventoryProductCardServiceCreateJobDTOs;
    }
    
    @Post('create/set')
    async createInventoryProductCardServiceCreateJobSet(@Body() body: any)
    {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobSet(body.createInventoryProductCardServiceCreateJobDTO);

        return inventoryProductCardServiceCreateJobDTO;
    }

    
    @Get('all/:commerceAccountId')
    async getInventoryProductCardServiceCreateJobsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceAccountId(commerceAccountId);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('all/:commerceAccountId/:productLineCode')
    async getInventoryProductCardServiceCreateJobsByCommerceAccountIdAndProductLineCode(@Param('commerceAccountId') commerceAccountId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceAccountIdAndProductLineCode(commerceAccountId, productLineCode);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('all/location/:commerceLocationId')
    async getInventoryProductCardServiceCreateJobsByCommerceLocationId(@Param('commerceLocationId') commerceLocationId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceLocationId(commerceLocationId);
        
        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('all/location/:commerceLocationId/:productLineCode')
    async getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCode(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCode(commerceLocationId, productLineCode);
        
        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('review/:inventoryProductCardServiceCreateJobId')
    async getInventoryProductCardServiceCreateJobDetailsById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobDetailsById(inventoryProductCardServiceCreateJobId);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('approve/:inventoryProductCardServiceCreateJobId')
    async approveInventoryProductCardServiceCreateJobDetailsById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.approveInventoryProductCardServiceCreateJobDetailsById(inventoryProductCardServiceCreateJobId);
        
        return inventoryProductCardServiceCreateJobDTO;
    }
        


}