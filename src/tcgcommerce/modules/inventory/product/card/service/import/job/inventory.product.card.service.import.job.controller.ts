import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InventoryProductCardServiceImportJobService } from './inventory.product.card.service.import.job.service';
import { InventoryProductCardServiceImportJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/dto/inventory.product.card.service.import.job.dto';


@Controller('inventory/product/card/service/import/job')
export class InventoryProductCardServiceImportJobController {

    constructor(
        private inventoryProductCardServiceImportJobService: InventoryProductCardServiceImportJobService,
    ) { }
    


}