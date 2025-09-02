import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';
import { TCGdbMTGPriceChangeDailyDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/dto/tcgdb.mtg.price.change.daily.dto';
import { ProductSetDTO } from 'src/tcgcommerce/modules/product/set/dto/product.set.dto';

@Injectable()
export class PriceProductCardLineUpdateMTGService {

    constructor(
       @InjectRepository(PriceProductCardServiceUpdate) private priceProductCardServiceUpdateRepository: Repository<PriceProductCardServiceUpdate>,
       private productCardService: ProductCardService,
       private productLineService: ProductLineService,
       private productSetService: ProductSetService,
       private inventoryProductCardService: InventoryProductCardService,
       private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) { }

    
    async updateMTGProductCardPrices(productLineId: string, productCardLanguageCode: string, commerceAccountId: string) {
        
    }
    
    

    
}