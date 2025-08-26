import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/service/update/pricing.product.card.service.update.entity';
import { PricingProductCardServiceUpdateDTO } from './dto/pricing.product.card.service.update.dto';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';

@Injectable()
export class PricingProductCardServiceUpdateService {

    constructor(
       @InjectRepository(PricingProductCardServiceUpdate) private pricingProductCardServiceUpdateRepository: Repository<PricingProductCardServiceUpdate>,
       private productCardService: ProductCardService,
       private inventoryProductCardService: InventoryProductCardService,
       private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) { }

    

    

    
}