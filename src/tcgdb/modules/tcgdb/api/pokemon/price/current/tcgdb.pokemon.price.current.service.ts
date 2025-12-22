import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbPokemonCardService } from 'src/tcgdb/modules/tcgdb/api/pokemon/card/tcgdb.pokemon.card.service';
import { TCGdbPokemonPriceHistoryService } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/history/tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPricesCurrentDTO, TCGdbPokemonPriceCurrentDTO } from './dto/tcgdb.pokemon.price.current.dto';

@Injectable()
export class TCGdbPokemonPriceCurrentService {

    constructor(
        private tcgdbPokemonCardService: TCGdbPokemonCardService,
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService,
    ) {}

        
}


