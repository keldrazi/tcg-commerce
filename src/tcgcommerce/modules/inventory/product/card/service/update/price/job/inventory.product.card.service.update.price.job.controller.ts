import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceUpdatePriceJobService } from './inventory.product.card.service.update.price.job.service';
import { InventoryProductCardServiceUpdatePriceJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/dto/inventory.product.card.service.update.price.job.dto';


@Controller('inventory/product/card/service/update/price/job')
export class InventoryProductCardServiceUpdatePriceJobController {

    constructor(
        private inventoryProductCardServiceUpdatePriceJobService: InventoryProductCardServiceUpdatePriceJobService,
    ) { }
    

    @Get('all/:commerceAccountId/:productLineCode')
    async getInventoryProductCardServiceUpdatePriceJobsByCommerceAccountIdAndProductLineCode(@Param('commerceAccountId') commerceAccountId: string, @Param('productLineCode') productLineCode: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.inventoryProductCardServiceUpdatePriceJobService.getInventoryProductCardServiceUpdatePriceJobsByCommerceAccountIdAndProductLineCode(commerceAccountId, productLineCode);

        return inventoryProductCardServiceUpdatePriceJobDTO;
    }


        


}