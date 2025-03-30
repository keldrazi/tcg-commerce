import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGPriceService } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.service';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.service';
import { TCGdbMTGPricesDTO, TCGdbMTGPriceDTO } from './dto/tcgdb.mtg.price.dto';
import { TCGdbMTGPrice } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/tcgdb.mtg.price.entity';

@Injectable()
export class TCGdbMTGPriceService {

    constructor(
        @InjectRepository(TCGdbMTGPrice) private tcgdbMTGPriceRepository: Repository<TCGdbMTGPrice>, 
        private tcgPlayerMTGPriceService: TCGPlayerMTGPriceService,
        private tcgdbMTGCardService: TCGdbMTGCardService,
    ) {}

    async getTCGdbMTGPricesByCardIdAndDate(cardId: string) {
        
        let date = new Date();

        const tcgdbMTGPrices = await this.tcgdbMTGPriceRepository.find({
            where: {
                tcgdbMTGCardId: cardId,
                tcgdbMTGPriceCreateDate: date,
            }
        });

        let tcgdbMTGPriceDTOs: TCGdbMTGPriceDTO[] = [];

        for(let i = 0; i < tcgdbMTGPrices.length; i++) {
            let tcgdbMTGPrice = tcgdbMTGPrices[i];

            let tcgdbMTGPriceDTO: TCGdbMTGPriceDTO = {
                tcgdbMTGPriceLowPrice: tcgdbMTGPrice.tcgdbMTGPriceLowPrice,
                tcgdbMTGPriceMidPrice: tcgdbMTGPrice.tcgdbMTGPriceMidPrice,
                tcgdbMTGPriceHighPrice: tcgdbMTGPrice.tcgdbMTGPriceHighPrice,
                tcgdbMTGPriceMarketPrice: tcgdbMTGPrice.tcgdbMTGPriceMarketPrice,
                tcgdbMTGPriceDirectLowPrice: tcgdbMTGPrice.tcgdbMTGPriceDirectLowPrice,
                tcgdbMTGPriceSubTypeName: tcgdbMTGPrice.tcgdbMTGPriceSubTypeName,
            }

            tcgdbMTGPriceDTOs.push(tcgdbMTGPriceDTO);

        }

        let tcgdbMTGPricesDTO: TCGdbMTGPricesDTO = {
            tcgdbMTGPrices: tcgdbMTGPriceDTOs,
        }

        return tcgdbMTGPricesDTO;

    }  

    async getTCGdbMTGPricesByCardId(cardId: string) {
        
        const tcgdbMTGPrices = await this.tcgdbMTGPriceRepository.find({
            where: {
                tcgdbMTGCardId: cardId,
            }
        });

        let tcgdbMTGPriceDTOs: TCGdbMTGPriceDTO[] = [];

        for(let i = 0; i < tcgdbMTGPrices.length; i++) {
            let tcgdbMTGPrice = tcgdbMTGPrices[i];

            let tcgdbMTGPriceDTO: TCGdbMTGPriceDTO = {
                tcgdbMTGPriceLowPrice: tcgdbMTGPrice.tcgdbMTGPriceLowPrice,
                tcgdbMTGPriceMidPrice: tcgdbMTGPrice.tcgdbMTGPriceMidPrice,
                tcgdbMTGPriceHighPrice: tcgdbMTGPrice.tcgdbMTGPriceHighPrice,
                tcgdbMTGPriceMarketPrice: tcgdbMTGPrice.tcgdbMTGPriceMarketPrice,
                tcgdbMTGPriceDirectLowPrice: tcgdbMTGPrice.tcgdbMTGPriceDirectLowPrice,
                tcgdbMTGPriceSubTypeName: tcgdbMTGPrice.tcgdbMTGPriceSubTypeName,
            }

            tcgdbMTGPriceDTOs.push(tcgdbMTGPriceDTO);

        }

        let tcgdbMTGPricesDTO: TCGdbMTGPricesDTO = {
            tcgdbMTGPrices: tcgdbMTGPriceDTOs,
        }

        return tcgdbMTGPricesDTO;

    } 
    
    async createTCGdbMTGPrices() {

        let tcgdbMTGPriceRecordCount = 0;
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

            const newTCGdbMTGPrice = this.tcgdbMTGPriceRepository.create({
                tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
                tcgdbMTGPriceTCGPlayerId: tcgPlayerMTGPrice.tcgPlayerMTGPriceProductId,
                tcgdbMTGPriceSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
                tcgdbMTGPriceLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceLowPrice,
                tcgdbMTGPriceMidPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMidPrice,
                tcgdbMTGPriceHighPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceHighPrice,
                tcgdbMTGPriceMarketPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMarketPrice,
                tcgdbMTGPriceDirectLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceDirectLowPrice,
                tcgdbMTGPriceSubTypeName: tcgPlayerMTGPrice.tcgPlayerMTGPriceSubTypeName,
            });

            await this.tcgdbMTGPriceRepository.save(newTCGdbMTGPrice);
            tcgdbMTGPriceRecordCount++;
        }

        await this.tcgPlayerMTGPriceService.updateTCGPlayerMTGPricesIsProcessed();
        
        return tcgdbMTGPriceRecordCount;

    }    
}


