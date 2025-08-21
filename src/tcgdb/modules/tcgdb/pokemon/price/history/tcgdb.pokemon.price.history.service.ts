import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TCGPlayerPokemonPriceService } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.service';
import { TCGdbPokemonCardService } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.service';
import { TCGdbPokemonPricesHistoryDTO, TCGdbPokemonPriceHistoryDTO } from './dto/tcgdb.pokemon.price.history.dto';
import { TCGdbPokemonPriceHistory } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.entity';
import { TCGdbPokemonCardDTO } from 'src/tcgdb/modules/tcgdb/pokemon/card/dto/tcgdb.pokemon.card.dto';
import { TCGPlayerPokemonPrice } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.entity';

@Injectable()
export class TCGdbPokemonPriceHistoryService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceHistory) private tcgdbPokemonPriceHistoryRepository: Repository<TCGdbPokemonPriceHistory>, 
        private tcgPlayerPokemonPriceService: TCGPlayerPokemonPriceService,
        private tcgdbPokemonCardService: TCGdbPokemonCardService,
    ) {}

    async getTCGdbPokemonPricesHistoryByCardIdAndDate(cardId: string) {
        
        let date = new Date();

        const tcgdbPokemonPriceHistorys = await this.tcgdbPokemonPriceHistoryRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
                tcgdbPokemonPriceHistoryCreateDate: date,
            }
        });

        let tcgdbPokemonPriceHistoryDTOs: TCGdbPokemonPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceHistorys.length; i++) {
            let tcgdbPokemonPriceHistory = tcgdbPokemonPriceHistorys[i];

            let tcgdbPokemonPriceHistoryDTO: TCGdbPokemonPriceHistoryDTO = ({ ...tcgdbPokemonPriceHistory });

            tcgdbPokemonPriceHistoryDTOs.push(tcgdbPokemonPriceHistoryDTO);

        }

        let tcgdbPokemonPriceHistorysDTO: TCGdbPokemonPricesHistoryDTO = {
            tcgdbPokemonPricesHistory: tcgdbPokemonPriceHistoryDTOs,
        }

        return tcgdbPokemonPriceHistorysDTO;

    }  

    async getTCGdbPokemonPricesHistoryByCardId(cardId: string) {
        
        const tcgdbPokemonPriceHistorys = await this.tcgdbPokemonPriceHistoryRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
            }
        });

        let tcgdbPokemonPriceHistoryDTOs: TCGdbPokemonPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceHistorys.length; i++) {
            let tcgdbPokemonPriceHistory = tcgdbPokemonPriceHistorys[i];

            let tcgdbPokemonPriceHistoryDTO: TCGdbPokemonPriceHistoryDTO = ({ ...tcgdbPokemonPriceHistory });

            tcgdbPokemonPriceHistoryDTOs.push(tcgdbPokemonPriceHistoryDTO);

        }

        let tcgdbPokemonPriceHistorysDTO: TCGdbPokemonPricesHistoryDTO = {
            tcgdbPokemonPricesHistory: tcgdbPokemonPriceHistoryDTOs,
        }

        return tcgdbPokemonPriceHistorysDTO;

    } 

    async getTCGdbPokemonPricesHistoryBySetCodeAndDate(setCode: string, priceHistoryDate: Date) {
        
        let startOfDay = new Date(priceHistoryDate);
        startOfDay.setHours(0, 0, 0, 0); // Set to 12:00:00 am

        const endOfDay = new Date(priceHistoryDate);
        endOfDay.setHours(23, 59, 59, 999); // Set to 11:59:59 pm

        const tcgdbPokemonPriceHistorys = await this.tcgdbPokemonPriceHistoryRepository.find({
            where: {
                tcgdbPokemonPriceHistorySetCode: setCode,
                tcgdbPokemonPriceHistoryCreateDate: Between(startOfDay, endOfDay),
            }
        });

        let tcgdbPokemonPriceHistoryDTOs: TCGdbPokemonPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceHistorys.length; i++) {
            let tcgdbPokemonPriceHistory = tcgdbPokemonPriceHistorys[i];

            let tcgdbPokemonPriceHistoryDTO: TCGdbPokemonPriceHistoryDTO = ({ ...tcgdbPokemonPriceHistory });

            tcgdbPokemonPriceHistoryDTOs.push(tcgdbPokemonPriceHistoryDTO);

        }

        return tcgdbPokemonPriceHistoryDTOs;

    } 
    
    async createTCGdbPokemonPricesHistory(tcgdbPokemonCard: TCGdbPokemonCardDTO, tcgPlayerPokemonPrice: TCGPlayerPokemonPrice) {

        const newTCGdbPokemonPrice = this.tcgdbPokemonPriceHistoryRepository.create({
            tcgdbPokemonCardId: tcgdbPokemonCard.tcgdbPokemonCardId,
            tcgdbPokemonPriceHistoryTCGPlayerId: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceProductId,
            tcgdbPokemonPriceHistorySetCode: tcgdbPokemonCard.tcgdbPokemonCardSetCode,
            tcgdbPokemonPriceHistoryLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceLowPrice,
            tcgdbPokemonPriceHistoryMidPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMidPrice,
            tcgdbPokemonPriceHistoryHighPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceHighPrice,
            tcgdbPokemonPriceHistoryMarketPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMarketPrice,
            tcgdbPokemonPriceHistoryDirectLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceDirectLowPrice,
            tcgdbPokemonPriceHistorySubTypeName: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceSubTypeName,
        });

        await this.tcgdbPokemonPriceHistoryRepository.save(newTCGdbPokemonPrice);
        
        return true;

    }    
}


