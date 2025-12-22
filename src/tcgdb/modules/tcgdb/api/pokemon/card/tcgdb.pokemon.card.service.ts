import { Injectable } from '@nestjs/common';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/api/pokemon/set/tcgdb.pokemon.set.service';
import { TCGdbPokemonCardsDTO, TCGdbPokemonCardDTO } from './dto/tcgdb.pokemon.card.dto';
import { ConfigService } from '@nestjs/config';
import { map, catchError, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TCGdbPokemonCardService {

    constructor(
        
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
    ) {}

}


