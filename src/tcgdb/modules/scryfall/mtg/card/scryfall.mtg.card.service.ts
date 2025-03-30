import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ScryfallMTGCard } from 'src/typeorm/entities/tcgdb/modules/scryfall/mtg/card/scryfall.mtg.card.entity';
import { ScryfallMTGSetService } from 'src/tcgdb/modules/scryfall/mtg/set/scryfall.mtg.set.service'
import { ScryfallAPICardService } from 'src/tcgdb/modules/scryfall/api/card/scryfall.api.card.service';


@Injectable()
export class ScryfallMTGCardService {

    constructor(
        @InjectRepository(ScryfallMTGCard) private scryfallMTGCardRepository: Repository<ScryfallMTGCard>,
        private scryfallMTGSetService: ScryfallMTGSetService,
        private scryfallAPICardService: ScryfallAPICardService,
    ) {}

    async getScryfallMTGCardByScryfallId(scryfallId: string) {
        const scryfallMTGCard = await this.scryfallMTGCardRepository.findOne({
            where: {
                scryfallMTGCardScryfallId: scryfallId,
            }
        });

        return scryfallMTGCard;

    }

    async getScryfallMTGCardByTCGPlayerId(tcgPlayerId: number) {
        const scryfallMTGCard = await this.scryfallMTGCardRepository.findOne({
            where: {
                scryfallMTGCardTCGPlayerId: tcgPlayerId,
            }
        });

        return scryfallMTGCard;

    }

    async createScryfallMTGCards() {

        const scryfallMTGSets = await this.scryfallMTGSetService.getScryfallMTGSets();

        let scryfallMTGCardRecordCount = 0;

        for(let i = 0; i < scryfallMTGSets.length; i++) {

            let scryfallMTGSet = scryfallMTGSets[i];
            
            let scryfallMTGCards: any = null;
            
            try {
                scryfallMTGCards = await this.scryfallAPICardService.getScryfallAPICardsByScryfallSet(scryfallMTGSet);
            }
            catch(e) {
                continue;
            }
            
            for(let j = 0; j < scryfallMTGCards.length; j++) {
                const scryfallMTGCard = scryfallMTGCards[j];
                console.log('Scryfall Card: ' + scryfallMTGCard.name);
                //CHECK TO MAKE SURE THE CARD DOESN'T ALREADY EXIST;
                const scryfallMTGCardCheck = await this.getScryfallMTGCardByScryfallId(scryfallMTGCard.id);

                //IF THE CARD DOESN'T EXIST - CREATE THE CARD;
                if(scryfallMTGCardCheck == null) {

                    const newScryfallMTGCard = this.scryfallMTGCardRepository.create({
                        scryfallMTGCardScryfallId: scryfallMTGCard.id,
                        scryfallMTGCardTCGPlayerId: scryfallMTGCard.tcgplayer_id,
                        scryfallMTGCardTCGPlayerEtchedId: scryfallMTGCard.tcgplayer_etched_id,
                        scryfallMTGCardCardMarketId: scryfallMTGCard.cardmarket_id,
                        scryfallMTGCardSetId: scryfallMTGCard.set_id,
                        scryfallMTGCardName: scryfallMTGCard.name,
                        scryfallMTGCardReleasedAt: scryfallMTGCard.released_at,
                        scryfallMTGCardDigital: scryfallMTGCard.digital,
                        scryfallMTGCardPromo: scryfallMTGCard.promo,
                        scryfallMTGCardData: scryfallMTGCard,
                    });

                    await this.scryfallMTGCardRepository.save(newScryfallMTGCard);

                    scryfallMTGCardRecordCount++;
                }
            }

        }

        return scryfallMTGCardRecordCount;
    }

    async updateScryfallMTGCards() {

        const scryfallMTGSets = await this.scryfallMTGSetService.getScryfallMTGSets();

        let scryfallMTGCardRecordCount = 0;

        for(let i = 0; i < scryfallMTGSets.length; i++) {

            let scryfallMTGSet = scryfallMTGSets[i];

            let scryfallMTGCards = await this.scryfallAPICardService.getScryfallAPICardsByScryfallSet(scryfallMTGSet);

            for(let j = 0; j < scryfallMTGCards.length; j++) {
                const scryfallMTGCard = scryfallMTGCards[j];

                //CHECK TO MAKE SURE THE CARD DOESN'T ALREADY EXIST;
                let scryfallMTGCardUpdate = await this.getScryfallMTGCardByScryfallId(scryfallMTGCard.id);

                //IF THE CARD EXISTS UPDATE THE CARD;
                if(scryfallMTGCardUpdate != null) {
                    scryfallMTGCardUpdate.scryfallMTGCardData = scryfallMTGCard;
                    scryfallMTGCardUpdate.scryfallMTGCardUpdateDate = new Date();
                    
                    await this.scryfallMTGCardRepository.save(scryfallMTGCardUpdate);
                    
                    scryfallMTGCardRecordCount++;
                }

            }

        }

        return scryfallMTGCardRecordCount;
    }
}


