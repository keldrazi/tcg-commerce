import { Body, Controller, Get, Param, Post, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from "@nestjs/common";
import { InventoryProductCardServiceCreateJobService } from './inventory.product.card.service.create.job.service';
import { InventoryProductCardServiceCreateJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/dto/inventory.product.card.service.create.job.dto';
import { EntityNotFoundError } from 'typeorm';


@Controller('inventory/product/card/service/create/job')
export class InventoryProductCardServiceCreateJobController {

    constructor(
        private inventoryProductCardServiceCreateJobService: InventoryProductCardServiceCreateJobService,
    ) { }
    
    @Get('caid/:commerceAccountId')
    async getInventoryProductCardServiceCreateJobsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceAccountId(commerceAccountId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product card service create jobs');
        }
    }

    @Get('caid/:commerceAccountId/plc/:productLineCode')
    async getInventoryProductCardServiceCreateJobsByCommerceAccountIdAndProductLineCode(@Param('commerceAccountId') commerceAccountId: string, @Param('productLineCode') productLineCode: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceAccountIdAndProductLineCode(commerceAccountId, productLineCode);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product card service create jobs');
        }
    }

    @Get('clid/:commerceLocationId')
    async getInventoryProductCardServiceCreateJobsByCommerceLocationId(@Param('commerceLocationId') commerceLocationId: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceLocationId(commerceLocationId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product card service create jobs');
        }
    }

    @Get('clid/:commerceLocationId/plc/:productLineCode')
    async getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCode(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCode(commerceLocationId, productLineCode);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product card service create jobs');
        }
    }

    @Post('/create')
    async createInventoryProductCardServiceJobs(@Body() body: any) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobs(body.createInventoryProductCardServiceCreateJobsDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create inventory product card service create jobs');
        }
    }
    
    @Post('/create/set')
    async createInventoryProductCardServiceCreateJobSet(@Body() body: any) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.createInventoryProductCardServiceCreateJobSet(body.createInventoryProductCardServiceCreateJobDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create inventory product card service create job set');
        }
    }

    @Get('process/clid/:commerceLocationId/plc/:productLineCode')
    async processInventoryProductCardServiceCreateJobs(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.processsInventoryProductCardServiceCreateJobs(commerceLocationId, productLineCode);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service create jobs not found');
            }
            throw new InternalServerErrorException('Failed to process inventory product card service create jobs');
        }
    }
    
    @Get('process/:inventoryProductCardServiceCreateJobId')
    async processInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.processsInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service create job not found');
            }
            throw new InternalServerErrorException('Failed to process inventory product card service create job');
        }
    }
    
    @Get('review/:inventoryProductCardServiceCreateJobId')
    async reviewInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.getInventoryProductCardServiceCreateJobDetailsById(inventoryProductCardServiceCreateJobId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service create job not found');
            }
            throw new InternalServerErrorException('Failed to review inventory product card service create job');
        }
    }

    @Get('approve/clid/:commerceLocationId/plc/:productLineCode')
    async approveInventoryProductCardServiceCreateJobs(@Param('commerceLocationId') commerceLocationId: string, @Param('productLineCode') productLineCode: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.approveInventoryProductCardServiceCreateJobs(commerceLocationId, productLineCode);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service create jobs not found');
            }
            throw new InternalServerErrorException('Failed to approve inventory product card service create jobs');
        }
    }

    @Get('approve/:inventoryProductCardServiceCreateJobId')
    async approveInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.approveInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service create job not found');
            }
            throw new InternalServerErrorException('Failed to approve inventory product card service create job');
        }
    }

    @Get('delete/:inventoryProductCardServiceCreateJobId')
    async deleteInventoryProductCardServiceCreateJobById(@Param('inventoryProductCardServiceCreateJobId') inventoryProductCardServiceCreateJobId: string) {
        try {
            return await this.inventoryProductCardServiceCreateJobService.deleteInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory product card service create job not found');
            }
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to delete inventory product card service create job');
        }
    }
        
}