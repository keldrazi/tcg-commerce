import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportCard } from 'src/typeorm/entities/tcgcommerce/modules/import/card/import.card.entity';
import { ImportSortDTO, ImportSortCardDTO } from './dto/import.sort.data.dto';

@Injectable()
export class ImportCardService {

    constructor(
        @InjectRepository(ImportCard) private importCardRepository: Repository<ImportCard>,
    ) { }

    
    
}