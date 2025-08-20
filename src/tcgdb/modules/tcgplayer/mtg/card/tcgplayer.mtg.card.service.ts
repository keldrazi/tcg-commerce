import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TCGPlayerMTGCard } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/card/tcgplayer.mtg.card.entity';
import { TCGPlayerMTGSetService } from 'src/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.service';
import { TCGPlayerAPICardService } from 'src/tcgdb/modules/tcgplayer/api/card/tcgplayer.api.card.service';
import { TCGPlayerAPISkuService } from 'src/tcgdb/modules/tcgplayer/api/sku/tcgplayer.api.sku.service';
import { TCGPlayerAPIUtilService } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.service';

@Injectable()
export class TCGPlayerMTGCardService {

    constructor(
        @InjectRepository(TCGPlayerMTGCard) private tcgPlayerMTGCardRepository: Repository<TCGPlayerMTGCard>, 
        private tcgPlayerMTGSetService: TCGPlayerMTGSetService,
        private tcgPlayerAPICardService: TCGPlayerAPICardService,
        private tcgPlayerAPIUtilService: TCGPlayerAPIUtilService,
        private tcgPlayerAPISkuService: TCGPlayerAPISkuService,
    ) {}

    async getTCGPlayerMTGCards() {
        const tcgPlayerMTGCards = await this.tcgPlayerMTGCardRepository.find();

        return tcgPlayerMTGCards;
    }
    
    async getTCGPlayerMTGCardByProductId(productId: number) {
        const tcgPlayerMTGCard = await this.tcgPlayerMTGCardRepository.findOne({
            where: {
                tcgPlayerMTGCardProductId: productId,
            }
        });

        return tcgPlayerMTGCard; 

    }
    
    async getTCGPlayerMTGCardsByGroupId(groupId: number) {
        const tcgPlayerMTGCards = await this.tcgPlayerMTGCardRepository.find({
            where: {
                tcgPlayerMTGCardGroupId: groupId,
            }
        });

        return tcgPlayerMTGCards;
    }

    async getTCGPlayerMTGCardByGroupIdAndName(groupId: number, name: string) {
        const tcgPlayerMTGCard = await this.tcgPlayerMTGCardRepository.findOne({
            where: {
                tcgPlayerMTGCardGroupId: groupId,
                tcgPlayerMTGCardName: name,
            }
        })

        return tcgPlayerMTGCard;
    }

    async createTCGPlayerMTGCards() {

        const tcgPlayerMTGSets = await this.tcgPlayerMTGSetService.getTCGPlayerMTGSets();
    
        let tcgPlayerCardRecordCount = 0;

        //GET AN ACCESS TOKEN FOR THE SKU API CALLS;
        //THIS NEEDS TO MOVE TO A PERSISTENT STORE;
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        for(let i = 0; i < tcgPlayerMTGSets.length; i++) {
            const tcgPlayerMTGSet = tcgPlayerMTGSets[i];
            
            let tcgPlayerMTGCards: any = null;
            
            if(tcgPlayerMTGSet.tcgPlayerMTGSetTotalCards > 0) {
                tcgPlayerMTGCards = await this.tcgPlayerAPICardService.getTCGPlayerAPICardsByGroupId(tcgPlayerMTGSet.tcgPlayerMTGSetGroupId.toString());


                for(let i = 0; i < tcgPlayerMTGCards.length; i++) {
                    const tcgPlayerMTGCard = tcgPlayerMTGCards[i];

                    //CHECK TO SEE IF THE CARD EXISTS;
                    let tcgPlayerMTGCardCheck = await this.getTCGPlayerMTGCardByProductId(tcgPlayerMTGCard.productId);
                    
                    if(tcgPlayerMTGCard.extendedData == null) {
                        tcgPlayerMTGCard.extendedData = [];
                    }
                    //CARD DOESN'T EXIST - CREATE CARD;
                    if(tcgPlayerMTGCardCheck == null) {
                        const newTCGPlayerMTGCard = this.tcgPlayerMTGCardRepository.create({
                            tcgPlayerMTGCardProductId: tcgPlayerMTGCard.productId,
                            tcgPlayerMTGCardGroupId: tcgPlayerMTGCard.groupId,
                            tcgPlayerMTGCardSetCode: tcgPlayerMTGSet.tcgPlayerMTGSetCode,
                            tcgPlayerMTGCardName: tcgPlayerMTGCard.name,
                            tcgPlayerMTGCardCleanName: tcgPlayerMTGCard.cleanName,
                            tcgPlayerMTGCardImageURL: tcgPlayerMTGCard.imageUrl,
                            tcgPlayerMTGCardURL: tcgPlayerMTGCard.url,
                            tcgPlayerMTGCardData: tcgPlayerMTGCard,
                            tcgPlayerMTGCardModifiedOn: tcgPlayerMTGCard.modifiedOn,
                        });

                        //GET THE SKU DATA FOR THE CARD;
                        let tcgPlayerMTGCardSkuData = await this.tcgPlayerAPISkuService.getTCGPlayerAPISkusByProductId(tcgPlayerMTGCard.productId, accessToken);

                        if(tcgPlayerMTGCardSkuData == null) {
                            tcgPlayerMTGCardSkuData = [];
                        }
                        
                        newTCGPlayerMTGCard.tcgPlayerMTGCardSKUs = tcgPlayerMTGCardSkuData;
                        await this.tcgPlayerMTGCardRepository.save(newTCGPlayerMTGCard);

                        tcgPlayerCardRecordCount++;
                    }
                }
            }
        }

        return tcgPlayerCardRecordCount;
        
    }

    
}


