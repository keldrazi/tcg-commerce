import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/service/update/pricing.product.card.service.update.entity';
import { PricingProductCardServiceUpdateDTO } from './dto/pricing.product.card.service.update.dto';

@Injectable()
export class PricingProductCardServiceUpdateService {

    constructor(
       @InjectRepository(PricingProductCardServiceUpdate) private pricingProductCardServiceUpdateRepository: Repository<PricingProductCardServiceUpdate>,
    ) { }

    
    
}