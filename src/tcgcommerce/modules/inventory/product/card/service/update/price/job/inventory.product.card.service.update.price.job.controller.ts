import { Body, Controller, Get, Param, Post, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { InventoryProductCardServiceUpdatePriceJobService } from './inventory.product.card.service.update.price.job.service';
import { InventoryProductCardServiceUpdatePriceJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/dto/inventory.product.card.service.update.price.job.dto';
import { EntityNotFoundError } from 'typeorm';


@Controller('inventory/product/card/service/update/price/job')
export class InventoryProductCardServiceUpdatePriceJobController {

    constructor(
        private inventoryProductCardServiceUpdatePriceJobService: InventoryProductCardServiceUpdatePriceJobService,
    ) { }
    

    @Get('/create')
    async createInventoryProductCardServiceUpdatePriceJobsByCommerceAccountIdsAndProductLineCode(@Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string, @Param('productTypeCode') productTypeCode: string, @Param('productLanguageCode') productLanguageCode: string) {
        try {
            return await this.inventoryProductCardServiceUpdatePriceJobService.createInventoryProductCardServiceUpdatePriceJobs(productVendorCode, productLineCode, productTypeCode, productLanguageCode);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Required data not found');
            }
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create inventory product card service update price jobs');
        }
    }


        


}