import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonCard } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/card/tcgplayer.pokemon.card.entity';
import { TCGPlayerPokemonSetService } from 'src/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.service';
import { TCGPlayerAPICardService } from 'src/tcgdb/modules/tcgplayer/api/card/tcgplayer.api.card.service';
import { TCGPlayerAPISkuService } from 'src/tcgdb/modules/tcgplayer/api/sku/tcgplayer.api.sku.service';
import { TCGPlayerAPIUtilService } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.service';

@Injectable()
export class TCGPlayerPokemonCardService {

    constructor(
        @InjectRepository(TCGPlayerPokemonCard) private tcgPlayerPokemonCardRepository: Repository<TCGPlayerPokemonCard>, 
        private tcgPlayerPokemonSetService: TCGPlayerPokemonSetService,
        private tcgPlayerAPICardService: TCGPlayerAPICardService,
        private tcgPlayerAPIUtilService: TCGPlayerAPIUtilService,
        private tcgPlayerAPISkuService: TCGPlayerAPISkuService,
    ) {}

    
    async getTCGPlayerPokemonCards() {
        const tcgPlayerPokemonCards = await this.tcgPlayerPokemonCardRepository.find();

        return tcgPlayerPokemonCards;
    }
    
    async getTCGPlayerPokemonCardByProductId(productId: number) {
        const tcgPlayerPokemonCard = await this.tcgPlayerPokemonCardRepository.findOne({
            where: {
                tcgPlayerPokemonCardProductId: productId,
            }
        });

        return tcgPlayerPokemonCard; 

    }
    
    async getTCGPlayerPokemonCardsByGroupId(groupId: number) {
        const tcgPlayerPokemonCards = await this.tcgPlayerPokemonCardRepository.find({
            where: {
                tcgPlayerPokemonCardGroupId: groupId,
            }
        });

        return tcgPlayerPokemonCards;
    }

    async getTCGPlayerPokemonCardByGroupIdAndName(groupId: number, name: string) {
        const tcgPlayerPokemonCard = await this.tcgPlayerPokemonCardRepository.findOne({
            where: {
                tcgPlayerPokemonCardGroupId: groupId,
                tcgPlayerPokemonCardName: name,
            }
        })

        return tcgPlayerPokemonCard;
    }

    async createTCGPlayerPokemonCards() {

        const tcgPlayerPokemonSets = await this.tcgPlayerPokemonSetService.getTCGPlayerPokemonSets();
        
        let tcgPlayerCardRecordCount = 0;

        //GET AN ACCESS TOKEN FOR THE SKU API CALLS;
        //THIS NEEDS TO MOVE TO A PERSISTENT STORE;
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        for(let i = 0; i < tcgPlayerPokemonSets.length; i++) {
            const tcgPlayerPokemonSet = tcgPlayerPokemonSets[i];
            
            let tcgPlayerPokemonCards: any = null;
            
            if(tcgPlayerPokemonSet.tcgPlayerPokemonSetTotalCards > 0) {
                tcgPlayerPokemonCards = await this.tcgPlayerAPICardService.getTCGPlayerAPICardsByGroupId(tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId.toString());
           

                for(let i = 0; i < tcgPlayerPokemonCards.length; i++) {
                    const tcgPlayerPokemonCard = tcgPlayerPokemonCards[i];
                    console.log(tcgPlayerPokemonCard.name);
                    const newTCGPlayerPokemonCard = this.tcgPlayerPokemonCardRepository.create({
                        tcgPlayerPokemonCardProductId: tcgPlayerPokemonCard.productId,
                        tcgPlayerPokemonCardGroupId: tcgPlayerPokemonCard.groupId,
                        tcgPlayerPokemonCardSetAbbreviation: tcgPlayerPokemonSet.tcgPlayerPokemonSetAbbreviation,
                        tcgPlayerPokemonCardName: tcgPlayerPokemonCard.name,
                        tcgPlayerPokemonCardCleanName: tcgPlayerPokemonCard.cleanName,
                        tcgPlayerPokemonCardImageURL: tcgPlayerPokemonCard.imageUrl,
                        tcgPlayerPokemonCardURL: tcgPlayerPokemonCard.url,
                        tcgPlayerPokemonCardModifiedOn: tcgPlayerPokemonCard.modifiedOn,
                    });

                    //GET THE SKU DATA FOR THE CARD;
                    const tcgPlayerPokemonCardSkuData = await this.tcgPlayerAPISkuService.getTCGPlayerAPISkusByProductId(tcgPlayerPokemonCard.productId, accessToken);
                    newTCGPlayerPokemonCard.tcgPlayerPokemonCardSKUs = tcgPlayerPokemonCardSkuData;

                    tcgPlayerCardRecordCount++;
                    await this.tcgPlayerPokemonCardRepository.save(newTCGPlayerPokemonCard);
                }
            }
        }

        return tcgPlayerCardRecordCount;
        
    }   
}


