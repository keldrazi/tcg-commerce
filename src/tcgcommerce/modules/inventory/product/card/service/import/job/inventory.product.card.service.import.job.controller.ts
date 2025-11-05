import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceCreateJobService } from './inventory.product.card.service.import.job.service';
import { InventoryProductCardServiceCreateJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/dto/inventory.product.card.service.create.job.dto';


@Controller('inventory/product/card/service/create/job')
export class InventoryProductCardServiceCreateJobController {

    constructor(
        private inventoryProductCardServiceCreateJobService: InventoryProductCardServiceCreateJobService,
    ) { }
    
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

    @Post('all')
    async createInventoryProductCardServiceJobs(@Body() body: any)
    {
        let inventoryProductCardServiceCreateJobDTOs = await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobs(body.createInventoryProductCardServiceCreateJobsDTO);

        return inventoryProductCardServiceCreateJobDTOs;
    }
    
    @Post('set')
    async createInventoryProductCardServiceCreateJobSet(@Body() body: any)
    {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobSet(body.createInventoryProductCardServiceCreateJobDTO);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('process/all/:commerceLocationId/:productLineCode')
    async processInventoryProductCardServiceCreateJobs(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceCreateJobDTOCount = await this.inventoryProductCardServiceCreateJobService.processsInventoryProductCardServiceCreateJobs(commerceLocationId, productLineCode);
        
        return inventoryProductCardServiceCreateJobDTOCount;
    }
    

    @Get('process/:inventoryProductCardServiceCreateJobId')
    async processInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.processsInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);
        
        return inventoryProductCardServiceCreateJobDTO;
    }
    

    @Get('review/:inventoryProductCardServiceCreateJobId')
    async reviewInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobDetailsById(inventoryProductCardServiceCreateJobId);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('approve/all/:commerceLocationId/:productLineCode')
    async approveInventoryProductCardServiceCreateJobs(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceCreateJobDTOCount = await this.inventoryProductCardServiceCreateJobService.approveInventoryProductCardServiceCreateJobs(commerceLocationId, productLineCode);

        return inventoryProductCardServiceCreateJobDTOCount;
    }

    @Get('approve/:inventoryProductCardServiceCreateJobId')
    async approveInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.approveInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);
        
        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('delete/:inventoryProductCardServiceCreateJobId')
    async deleteInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.deleteInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);
        
        return inventoryProductCardServiceCreateJobDTO;
    }
        


}