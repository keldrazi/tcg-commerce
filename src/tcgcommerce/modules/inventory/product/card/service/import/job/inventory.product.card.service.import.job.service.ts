import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardServiceImportJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/inventory.product.card.service.import.job.entity';
import { CreateInventoryProductCardServiceImportJobDTO, InventoryProductCardServiceImportJobDTO } from './dto/inventory.product.card.service.import.job.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { InventoryProductCardServiceImportJobItemService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/item/inventory.product.card.service.import.job.item.service';


@Injectable()
export class InventoryProductCardServiceImportJobService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJob) private inventoryProductCardServiceImportJobRepository: Repository<InventoryProductCardServiceImportJob>,
        private productSetService: ProductSetService,
        private inventoryProductCardServiceImportJobItemService: InventoryProductCardServiceImportJobItemService,
    ) { }

    

}