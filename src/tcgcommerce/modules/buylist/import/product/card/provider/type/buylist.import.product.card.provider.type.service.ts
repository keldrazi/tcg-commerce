import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardImportDTO, UpdateBuylistProductCardImportDTO, BuylistProductCardImportDTO } from './dto/buylist.import.product.card.provider.type.dto';
import { BuylistProductCardImport } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/import/buylist.product.card.import.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistProductCardImportService {

    constructor(
        @InjectRepository(BuylistProductCardImport) private buylistProductCardImportRepository: Repository<BuylistProductCardImport>,
        private errorMessageService: ErrorMessageService,
    ) { }

    
 
}