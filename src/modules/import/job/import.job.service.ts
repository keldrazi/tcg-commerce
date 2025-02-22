import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImportJobService {

    constructor(
        //@InjectRepository(CommerceAccount) private commerceAccountRepository: Repository<CommerceAccount>,
    ) { }

    
    
}