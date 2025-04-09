import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGPriceService } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.service';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.service';
import { TCGdbMTGPriceHistoryService } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.service';
import { TCGdbMTGPricesCurrentDTO, TCGdbMTGPriceCurrentDTO } from './dto/tcgdb.mtg.price.current.dto';
import { TCGdbMTGPriceCurrent } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.entity';

@Injectable()
export class TCGdbMTGPriceCurrentService {

    constructor(
        @InjectRepository(TCGdbMTGPriceCurrent) private tcgdbMTGPriceCurrentRepository: Repository<TCGdbMTGPriceCurrent>, 
        private tcgPlayerMTGPriceService: TCGPlayerMTGPriceService,
        private tcgdbMTGCardService: TCGdbMTGCardService,
        private tcgdbMTGPriceHistoryService: TCGdbMTGPriceHistoryService,
    ) {}

    async getTCGdbMTGPricesCurrentByCardId(cardId: string) {
        
        const tcgdbMTGPriceCurrents = await this.tcgdbMTGPriceCurrentRepository.find({
            where: {
                tcgdbMTGCardId: cardId,
            }
        });

        let tcgdbMTGPriceCurrentDTOs: TCGdbMTGPriceCurrentDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceCurrents.length; i++) {
            let tcgdbMTGPriceCurrent = tcgdbMTGPriceCurrents[i];

            let tcgdbMTGPriceCurrentDTO: TCGdbMTGPriceCurrentDTO = {
                tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
                tcgdbMTGPriceCurrentTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
                tcgdbMTGPriceCurrentSetAbbreviation: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSetAbbreviation,
                tcgdbMTGPriceCurrentLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice,
                tcgdbMTGPriceCurrentMidPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice,
                tcgdbMTGPriceCurrentHighPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice,
                tcgdbMTGPriceCurrentMarketPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice,
                tcgdbMTGPriceCurrentDirectLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentDirectLowPrice,
                tcgdbMTGPriceCurrentSubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName,
            }

            tcgdbMTGPriceCurrentDTOs.push(tcgdbMTGPriceCurrentDTO);

        }

        let tcgdbMTGPriceCurrentsDTO: TCGdbMTGPricesCurrentDTO = {
            tcgdbMTGPricesCurrent: tcgdbMTGPriceCurrentDTOs,
        }

        return tcgdbMTGPriceCurrentsDTO;

    } 
    
    async createTCGdbMTGPricesCurrent() {

        //REMOVE ALL CURRENT PRICES;
        await this.tcgdbMTGPriceCurrentRepository.createQueryBuilder()
            .delete()
            .from(TCGdbMTGPriceCurrent)
            .execute();


        let tcgdbMTGPriceCurrentRecordCount = 0;
        let tcgPlayerMTGPrices = await this.tcgPlayerMTGPriceService.getTCGPlayerMTGPricesToProcess();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgPlayerMTGPrices == null) {
            return null;
        }

        for(let i = 0; i < tcgPlayerMTGPrices.length; i++) {
            let tcgPlayerMTGPrice = tcgPlayerMTGPrices[i];
            let tcgdbMTGCard = await this.tcgdbMTGCardService.getTCGdbMTGCardByTCGPlayerId(tcgPlayerMTGPrice.tcgPlayerMTGPriceProductId);

            //TO DO: CREATE AN ERROR TO LOG;
            if(tcgdbMTGCard == null) {
                continue;
            }

            const newTCGdbMTGPrice = this.tcgdbMTGPriceCurrentRepository.create({
                tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
                tcgdbMTGPriceCurrentTCGPlayerId: tcgPlayerMTGPrice.tcgPlayerMTGPriceProductId,
                tcgdbMTGPriceCurrentSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
                tcgdbMTGPriceCurrentLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceLowPrice,
                tcgdbMTGPriceCurrentMidPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMidPrice,
                tcgdbMTGPriceCurrentHighPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceHighPrice,
                tcgdbMTGPriceCurrentMarketPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMarketPrice,
                tcgdbMTGPriceCurrentDirectLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceDirectLowPrice,
                tcgdbMTGPriceCurrentSubTypeName: tcgPlayerMTGPrice.tcgPlayerMTGPriceSubTypeName,
            });

            await this.tcgdbMTGPriceCurrentRepository.save(newTCGdbMTGPrice);

            await this.tcgdbMTGPriceHistoryService.createTCGdbMTGPricesHistory(tcgdbMTGCard, tcgPlayerMTGPrice);
            tcgdbMTGPriceCurrentRecordCount++;
        }

        await this.tcgPlayerMTGPriceService.updateTCGPlayerMTGPricesIsProcessed();
        await this.tcgPlayerMTGPriceService.deleteTCGPlayerMTGPricesIsProcessed();
        
        return tcgdbMTGPriceCurrentRecordCount;

    }    
}


