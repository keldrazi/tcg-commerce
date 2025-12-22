import { Injectable } from '@nestjs/common';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/api/pokemon/set/tcgdb.pokemon.set.service';
import { TCGdbPokemonPriceCurrentService } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/current/tcgdb.pokemon.price.current.service';
import { TCGdbPokemonPriceHistoryService } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/history/tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPricesChangeDailyDTO, TCGdbPokemonPriceChangeDailyDTO, CreateTCGdbPokemonPriceChangeDailyDTO } from './dto/tcgdb.pokemon.price.change.daily.dto';
import { TCGdbPokemonPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/history/dto/tcgdb.pokemon.price.history.dto';
import { TCGdbPokemonPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/current/dto/tcgdb.pokemon.price.current.dto';

@Injectable()
export class TCGdbPokemonPriceChangeDailyService {

    constructor(
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService,
        private tcgdbPokemonPriceCurrentService: TCGdbPokemonPriceCurrentService,
    ) {}

    
}


