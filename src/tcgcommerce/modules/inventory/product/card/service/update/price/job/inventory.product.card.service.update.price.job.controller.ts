import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceUpdatePriceJobService } from './inventory.product.card.service.update.price.job.service';
import { InventoryProductCardServiceUpdatePriceJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/dto/inventory.product.card.service.update.price.job.dto';


@Controller('inventory/product/card/service/update/price/job')
export class InventoryProductCardServiceUpdatePriceJobController {

    constructor(
        private inventoryProductCardServiceUpdatePriceJobService: InventoryProductCardServiceUpdatePriceJobService,
    ) { }
    

    @Get('/create')
    async createInventoryProductCardServiceUpdatePriceJobsByCommerceAccountIdsAndProductLineCode(@Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string, @Param('productTypeCode') productTypeCode: string, @Param('productLanguageCode') productLanguageCode: string) {
        let inventoryProductCardServiceUpdatePriceJobDTOs = await this.inventoryProductCardServiceUpdatePriceJobService.createInventoryProductCardServiceUpdatePriceJobs(productVendorCode, productLineCode, productTypeCode, productLanguageCode);
        
        return inventoryProductCardServiceUpdatePriceJobDTOs;
    }


        


}