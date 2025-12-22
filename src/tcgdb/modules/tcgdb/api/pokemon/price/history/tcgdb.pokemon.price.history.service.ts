import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TCGdbPokemonCardService } from 'src/tcgdb/modules/tcgdb/api/pokemon/card/tcgdb.pokemon.card.service';
import { TCGdbPokemonPricesHistoryDTO, TCGdbPokemonPriceHistoryDTO } from './dto/tcgdb.pokemon.price.history.dto';

import { TCGdbPokemonCardDTO } from 'src/tcgdb/modules/tcgdb/api/pokemon/card/dto/tcgdb.pokemon.card.dto';


@Injectable()
export class TCGdbPokemonPriceHistoryService {

    constructor(
        
        private tcgdbPokemonCardService: TCGdbPokemonCardService,
    ) {}

      
}


