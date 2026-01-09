import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceCreateJobService } from './inventory.product.card.service.create.job.service';
import { InventoryProductCardServiceCreateJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/dto/inventory.product.card.service.create.job.dto';


@Controller('inventory/product/card/service/create/job')
export class InventoryProductCardServiceCreateJobController {

    constructor(
        private inventoryProductCardServiceCreateJobService: InventoryProductCardServiceCreateJobService,
    ) { }
    
    @Get('caid/:commerceAccountId')
    async getInventoryProductCardServiceCreateJobsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceAccountId(commerceAccountId);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('caid/:commerceAccountId/plc/:productLineCode')
    async getInventoryProductCardServiceCreateJobsByCommerceAccountIdAndProductLineCode(@Param('commerceAccountId') commerceAccountId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceAccountIdAndProductLineCode(commerceAccountId, productLineCode);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('clid/:commerceLocationId')
    async getInventoryProductCardServiceCreateJobsByCommerceLocationId(@Param('commerceLocationId') commerceLocationId: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceLocationId(commerceLocationId);
        
        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('clid/:commerceLocationId/plc/:productLineCode')
    async getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCode(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCode(commerceLocationId, productLineCode);
        
        return inventoryProductCardServiceCreateJobDTO;
    }

    @Post('/create')
    async createInventoryProductCardServiceJobs(@Body() body: any)
    {
        let inventoryProductCardServiceCreateJobDTOs = await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobs(body.createInventoryProductCardServiceCreateJobsDTO);

        return inventoryProductCardServiceCreateJobDTOs;
    }
    
    @Post('/create/set')
    async createInventoryProductCardServiceCreateJobSet(@Body() body: any)
    {
        let inventoryProductCardServiceCreateJobDTO = await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobSet(body.createInventoryProductCardServiceCreateJobDTO);

        return inventoryProductCardServiceCreateJobDTO;
    }

    @Get('process/clid/:commerceLocationId/plc/:productLineCode')
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

    @Get('approve/clid/:commerceLocationId/plc/:productLineCode')
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