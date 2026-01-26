import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from "@nestjs/common";
import { InventoryProductCardServiceImportJobService } from './inventory.product.card.service.import.job.service';
import { InventoryProductCardServiceImportJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/dto/inventory.product.card.service.import.job.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { EntityNotFoundError } from 'typeorm';

@Controller('inventory/product/card/service/import/job')
export class InventoryProductCardServiceImportJobController {

    constructor(
        private inventoryProductCardServiceImportJobService: InventoryProductCardServiceImportJobService,
    ) { }
    
    
    @Post('/create')
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
        try {
            return await this.inventoryProductCardServiceImportJobService.createInventoryProductCardServiceImportJob(inventoryProductCardServiceImportJobFile, body.createInventoryProductCardServiceImportJobDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Import job provider type not found');
            }
            throw new InternalServerErrorException('Failed to create inventory product card service import job');
        }
    }
    
    @Get('review/:inventoryProductCardServiceImportJobId')
    async reviewInventoryProductCardServiceImportJobById(@Param('inventoryProductCardServiceImportJobId') inventoryProductCardServiceImportJobId: string) {
        try {
            return await this.inventoryProductCardServiceImportJobService.getInventoryProductCardServiceImportJobDetailsById(inventoryProductCardServiceImportJobId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service import job not found');
            }
            throw new InternalServerErrorException('Failed to review inventory product card service import job');
        }
    }

    @Get('approve/:inventoryProductCardServiceImportJobId')
    async approveInventoryProductCardServiceImportJobById(@Param('inventoryProductCardServiceImportJobId') inventoryProductCardServiceImportJobId: string) {
        try {
            return await this.inventoryProductCardServiceImportJobService.approveInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service import job not found');
            }
            throw new InternalServerErrorException('Failed to approve inventory product card service import job');
        }
    }

    @Get('delete/:inventoryProductCardServiceImportJobId')
    async deleteInventoryProductCardServiceImportJobById(@Param('inventoryProductCardServiceImportJobId') inventoryProductCardServiceImportJobId: string) {
        try {
            return await this.inventoryProductCardServiceImportJobService.deleteInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service import job not found');
            }
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to delete inventory product card service import job');
        }
    }




    //GET ALL IMPORT JOBS FOR A COMMERCE ACCOUNT;
    //REVIEW IMPORT JOB
    //REJECT IMPORT JOB
    //APPROVE IMPORT JOB


}