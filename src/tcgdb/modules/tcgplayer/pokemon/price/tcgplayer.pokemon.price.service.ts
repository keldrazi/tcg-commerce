import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerPokemonPrice } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIPriceService } from 'src/tcgdb/modules/tcgplayer/api/price/tcgplayer.api.price.service';
import { TCGPlayerPokemonSetService } from 'src/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.service';
import { TCGPlayerPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.entity';

@Injectable()
export class TCGPlayerPokemonPriceService {

    constructor(
        @InjectRepository(TCGPlayerPokemonPrice) private tcgPlayerPokemonPriceRepository: Repository<TCGPlayerPokemonPrice>, 
        private tcgPlayerAPIPriceService: TCGPlayerAPIPriceService,
        private tcgPlayerPokemonSetService: TCGPlayerPokemonSetService,
    ) {}

    async getTCGPlayerPokemonPricesByTCGPlayerId(tcgPlayerId: number) {
        let tcgPlayerPokemonPrices = this.tcgPlayerPokemonPriceRepository.find({ where: { tcgPlayerPokemonPriceProductId: tcgPlayerId } });

        return tcgPlayerPokemonPrices;
    }

    async getCurrentTCGPlayerPokemonPricesByTCGPlayerId(tcgPlayerId: number) {

        let currentDate = new Date();

        let tcgPlayerPokemonPrices = this.tcgPlayerPokemonPriceRepository.find({ 
            where: { 
                tcgPlayerPokemonPriceProductId: tcgPlayerId, 
                tcgPlayerPokemonPriceCreateDate: currentDate,
            } });

        return tcgPlayerPokemonPrices;
    
    }

    async getTCGPlayerPokemonPricesToProcess() {
        let tcgPlayerPokemonPrices = this.tcgPlayerPokemonPriceRepository.find({ 
            where: { 
                tcgPlayerPokemonPriceIsProcessed: false 
            } 
        });

        return tcgPlayerPokemonPrices;
    }

    async createTCGPlayerPokemonPrices() {

        let tcgPlayerPokemonPriceRecordCount = 0;
        let tcgPlayerPokemonSets = await this.tcgPlayerPokemonSetService.getTCGPlayerPokemonSets();
        
        for(let i = 0; i < tcgPlayerPokemonSets.length; i++) {
            const tcgPlayerPokemonSet: TCGPlayerPokemonSet = tcgPlayerPokemonSets[i];
            
            let tcgPlayerPokemonPrices: any = null;
            
            try {
                tcgPlayerPokemonPrices = await this.tcgPlayerAPIPriceService.getTCGPlayerAPIPricesByGroupId(tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId.toString());
            }
            catch(e) {
                continue;
            }

            for(let j = 0; j < tcgPlayerPokemonPrices.length; j++) {
                const tcgPlayerPokemonPrice: any = tcgPlayerPokemonPrices[j];
                
                const newTCGPlayerPokemonPrice = this.tcgPlayerPokemonPriceRepository.create({
                    tcgPlayerPokemonPriceGroupId: tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId,
                    tcgPlayerPokemonPriceProductId: tcgPlayerPokemonPrice.productId,
                    tcgPlayerPokemonPriceLowPrice: tcgPlayerPokemonPrice.lowPrice,
                    tcgPlayerPokemonPriceMidPrice: tcgPlayerPokemonPrice.midPrice,
                    tcgPlayerPokemonPriceHighPrice: tcgPlayerPokemonPrice.highPrice,
                    tcgPlayerPokemonPriceMarketPrice: tcgPlayerPokemonPrice.marketPrice,
                    tcgPlayerPokemonPriceDirectLowPrice: tcgPlayerPokemonPrice.directLowPrice,
                    tcgPlayerPokemonPriceSubTypeName: tcgPlayerPokemonPrice.subTypeName,
                })
                
                await this.tcgPlayerPokemonPriceRepository.save(newTCGPlayerPokemonPrice);
                    
                tcgPlayerPokemonPriceRecordCount++;
            }
        }
        
        return tcgPlayerPokemonPriceRecordCount;

    }

    async updateTCGPlayerPokemonPricesIsProcessed() {
        let tcgPlayerPokemonPriceRecordCount = 0;
        let tcgPlayerPokemonPrices = await this.getTCGPlayerPokemonPricesToProcess();

        for(let i = 0; i < tcgPlayerPokemonPrices.length; i++) {
            const tcgPlayerPokemonPrice = tcgPlayerPokemonPrices[i];
            tcgPlayerPokemonPrice.tcgPlayerPokemonPriceIsProcessed = true;

            await this.tcgPlayerPokemonPriceRepository.save(tcgPlayerPokemonPrice);

            tcgPlayerPokemonPriceRecordCount++;
        }

        return tcgPlayerPokemonPriceRecordCount;
    }

    async deleteTCGPlayerPokemonPricesIsProcessed() {
        
        this.tcgPlayerPokemonPriceRepository.createQueryBuilder()
            .delete()
            .where("tcgPlayerPokemonPriceIsProcessed = :isProcessed", { isProcessed: true })
            .execute();

        return true;
    }
}


