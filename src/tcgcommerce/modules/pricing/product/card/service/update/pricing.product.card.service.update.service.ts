import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { PricingProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/pricing/module/pricing.module.entity';
import { PricingProductCardServiceUpdateDTO } from './dto/pricing.product.card.service.update.dto';

@Injectable()
export class PricingProductCardServiceUpdateService {

    constructor(
       // @InjectRepository(PricingModule) private pricingModuleRepository: Repository<PricingModule>,
    ) { }

    
    
}