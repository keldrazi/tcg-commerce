import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerMTGPrice } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIPriceService } from 'src/tcgdb/modules/tcgplayer/api/price/tcgplayer.api.price.service';
import { TCGPlayerMTGSetService } from 'src/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.service';
import { TCGPlayerMTGSet } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.entity';

@Injectable()
export class TCGPlayerMTGPriceService {

    constructor(
        @InjectRepository(TCGPlayerMTGPrice) private tcgPlayerMTGPriceRepository: Repository<TCGPlayerMTGPrice>, 
        private tcgPlayerAPIPriceService: TCGPlayerAPIPriceService,
        private tcgPlayerMTGSetService: TCGPlayerMTGSetService,
    ) {}



    async getTCGPlayerMTGPricesByTCGPlayerId(tcgPlayerId: number) {
        let tcgPlayerMTGPrices = this.tcgPlayerMTGPriceRepository.find({ where: { tcgPlayerMTGPriceProductId: tcgPlayerId } });

        return tcgPlayerMTGPrices;
    }

    async getTCGPlayerMTGPricesToProcess() {
        let tcgPlayerMTGPrices = this.tcgPlayerMTGPriceRepository.find({ 
            where: { 
                tcgPlayerMTGPriceIsProcessed: false 
            } 
        });

        return tcgPlayerMTGPrices;
    }

    async getCurrentTCGPlayerMTGPricesByTCGPlayerId(tcgPlayerId: number) {

        let currentDate = new Date();

        let tcgPlayerMTGPrices = this.tcgPlayerMTGPriceRepository.find({ 
            where: { 
                tcgPlayerMTGPriceProductId: tcgPlayerId, 
                tcgPlayerMTGPriceCreateDate: currentDate,
            } 
        });

        return tcgPlayerMTGPrices;
    
    }

    async createTCGPlayerMTGPrices() {

        let tcgPlayerMTGPriceRecordCount = 0;
        let tcgPlayerMTGSets = await this.tcgPlayerMTGSetService.getTCGPlayerMTGSets();
        
        for(let i = 0; i < tcgPlayerMTGSets.length; i++) {
            const tcgPlayerMTGSet: TCGPlayerMTGSet = tcgPlayerMTGSets[i];
            
            let tcgPlayerMTGPrices: any = null;
            
            try {
                tcgPlayerMTGPrices = await this.tcgPlayerAPIPriceService.getTCGPlayerAPIPricesByGroupId(tcgPlayerMTGSet.tcgPlayerMTGSetGroupId.toString());
            }
            catch(e) {
                continue;
            }

            for(let j = 0; j < tcgPlayerMTGPrices.length; j++) {
                const tcgPlayerMTGPrice: any = tcgPlayerMTGPrices[j];
                
                const newTCGPlayerMTGPrice = this.tcgPlayerMTGPriceRepository.create({
                    tcgPlayerMTGPriceGroupId: tcgPlayerMTGSet.tcgPlayerMTGSetGroupId,
                    tcgPlayerMTGPriceProductId: tcgPlayerMTGPrice.productId,
                    tcgPlayerMTGPriceLowPrice: tcgPlayerMTGPrice.lowPrice,
                    tcgPlayerMTGPriceMidPrice: tcgPlayerMTGPrice.midPrice,
                    tcgPlayerMTGPriceHighPrice: tcgPlayerMTGPrice.highPrice,
                    tcgPlayerMTGPriceMarketPrice: tcgPlayerMTGPrice.marketPrice,
                    tcgPlayerMTGPriceDirectLowPrice: tcgPlayerMTGPrice.directLowPrice,
                    tcgPlayerMTGPriceSubTypeName: tcgPlayerMTGPrice.subTypeName,
                })
                
                await this.tcgPlayerMTGPriceRepository.save(newTCGPlayerMTGPrice);
                    
                tcgPlayerMTGPriceRecordCount++;
            }
        }
        
        return tcgPlayerMTGPriceRecordCount;

    }

    async updateTCGPlayerMTGPricesIsProcessed() {
        let tcgPlayerMTGPriceRecordCount = 0;
        let tcgPlayerMTGPrices = await this.getTCGPlayerMTGPricesToProcess();

        for(let i = 0; i < tcgPlayerMTGPrices.length; i++) {
            const tcgPlayerMTGPrice = tcgPlayerMTGPrices[i];
            tcgPlayerMTGPrice.tcgPlayerMTGPriceIsProcessed = true;

            await this.tcgPlayerMTGPriceRepository.save(tcgPlayerMTGPrice);

            tcgPlayerMTGPriceRecordCount++;
        }

        return tcgPlayerMTGPriceRecordCount;
    }

    async deleteTCGPlayerMTGPricesIsProcessed() {
        
        this.tcgPlayerMTGPriceRepository.createQueryBuilder()
            .delete()
            .where("tcgPlayerMTGPriceIsProcessed = :isProcessed", { isProcessed: true })
            .execute();

        return true;
    }
}


