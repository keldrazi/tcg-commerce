import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.service';
import { TCGPlayerMTGCardService } from 'src/tcgdb/modules/tcgplayer/mtg/card/tcgplayer.mtg.card.service';
import { ScryfallMTGCardService } from 'src/tcgdb/modules/scryfall/mtg/card/scryfall.mtg.card.service';
import { TCGdbMTGSetCardDTO, TCGdbMTGCardDTO } from './dto/tcgdb.mtg.card.dto';
import { TCGdbMTGSetDTO } from 'src/tcgdb/modules/tcgdb/mtg/set/dto/tcgdb.mtg.set.dto';
import { TCGdbMTGCard } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.entity';


@Injectable()
export class TCGdbMTGCardService {

    constructor(
        @InjectRepository(TCGdbMTGCard) private tcgdbMTGCardRepository: Repository<TCGdbMTGCard>, 
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private tcgPlayerMTGCardService: TCGPlayerMTGCardService,
        private scryfallMTGCardService: ScryfallMTGCardService,
    ) {}

    async getTCGdbMTGCardByTCGPlayerId(tcgdbMTGPlayerId: number) {
        
        const tcgdbMTGCard = await this.tcgdbMTGCardRepository.findOne({
            where: {
                tcgdbMTGCardTCGPlayerId: tcgdbMTGPlayerId,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGCard == null) {
            return null;
        }

        let tcgdbMTGCardDTO: TCGdbMTGCardDTO = {
            tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
            tcgdbMTGCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
            tcgdbMTGCardScryfallId: tcgdbMTGCard.tcgdbMTGCardScryfallId,
            tcgdbMTGCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
            tcgdbMTGCardSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
            tcgdbMTGCardRarityAbbreviation: tcgdbMTGCard.tcgdbMTGCardRarityAbbreviation,
            tcgdbMTGCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
            tcgdbMTGCardName: tcgdbMTGCard.tcgdbMTGCardName,
            tcgdbMTGCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
            tcgdbMTGCardImageURL: tcgdbMTGCard.tcgdbMTGCardImageURL,
            tcgdbMTGCardTCGPlayerData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
            tcgdbMTGCardTCGPlayerSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
            tcgdbMTGCardScryfallData: tcgdbMTGCard.tcgdbMTGCardScryfallData,
        };

        return tcgdbMTGCardDTO;
    }


    async getTCGdbMTGCardByTCGdbId(tcgdbMTGCardId: string) {
        
        const tcgdbMTGCard = await this.tcgdbMTGCardRepository.findOne({
            where: {
                tcgdbMTGCardId: tcgdbMTGCardId,
            }
        })

         //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGCard == null) {
            return null;
        }

        let tcgdbMTGCardDTO: TCGdbMTGCardDTO = {
            tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
            tcgdbMTGCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
            tcgdbMTGCardScryfallId: tcgdbMTGCard.tcgdbMTGCardScryfallId,
            tcgdbMTGCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
            tcgdbMTGCardSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
            tcgdbMTGCardRarityAbbreviation: tcgdbMTGCard.tcgdbMTGCardRarityAbbreviation,
            tcgdbMTGCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
            tcgdbMTGCardName: tcgdbMTGCard.tcgdbMTGCardName,
            tcgdbMTGCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
            tcgdbMTGCardImageURL: tcgdbMTGCard.tcgdbMTGCardImageURL,
            tcgdbMTGCardTCGPlayerData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
            tcgdbMTGCardTCGPlayerSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
            tcgdbMTGCardScryfallData: tcgdbMTGCard.tcgdbMTGCardScryfallData,
        };

        return tcgdbMTGCardDTO;
    }

    async getTCGdbMTGCardByCardAndSetName(cardName: string, setName: string) {

        let tcgdbMTGSetDTO = await this.tcgdbMTGSetService.getTCGdbMTGSetBySetName(setName);

         //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSetDTO == null) {
            return null;
        }

        let tcgdbMTGCard = await this.tcgdbMTGCardRepository.findOne({
            where: {
                tcgdbMTGCardName: cardName,
                tcgdbMTGCardSetAbbreviation: tcgdbMTGSetDTO.tcgdbMTGSetAbbreviation,
            }
        });

         //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGCard == null) {
            return null;
        }

        let tcgdbMTGCardDTO: TCGdbMTGCardDTO = {
            tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
            tcgdbMTGCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
            tcgdbMTGCardScryfallId: tcgdbMTGCard.tcgdbMTGCardScryfallId,
            tcgdbMTGCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
            tcgdbMTGCardSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
            tcgdbMTGCardRarityAbbreviation: tcgdbMTGCard.tcgdbMTGCardRarityAbbreviation,
            tcgdbMTGCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
            tcgdbMTGCardName: tcgdbMTGCard.tcgdbMTGCardName,
            tcgdbMTGCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
            tcgdbMTGCardImageURL: tcgdbMTGCard.tcgdbMTGCardImageURL,
            tcgdbMTGCardTCGPlayerData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
            tcgdbMTGCardTCGPlayerSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
            tcgdbMTGCardScryfallData: tcgdbMTGCard.tcgdbMTGCardScryfallData,
        };

        return tcgdbMTGCardDTO;

    }

    async getTCGdbMTGCardsByCardName(cardName: string) {

        let tcgdbMTGCards = await this.tcgdbMTGCardRepository.find({
            where: {
                tcgdbMTGCardName: cardName,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGCards == null) {
            return null;
        }

        let tcgdbMTGCardDTOs: TCGdbMTGCardDTO[] = [];

        for(let i=0; i < tcgdbMTGCards.length; i++) {
            let tcgdbMTGCard = tcgdbMTGCards[i];

            let tcgdbMTGCardDTO: TCGdbMTGCardDTO = {
                tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
                tcgdbMTGCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
                tcgdbMTGCardScryfallId: tcgdbMTGCard.tcgdbMTGCardScryfallId,
                tcgdbMTGCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
                tcgdbMTGCardSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
                tcgdbMTGCardRarityAbbreviation: tcgdbMTGCard.tcgdbMTGCardRarityAbbreviation,
                tcgdbMTGCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
                tcgdbMTGCardName: tcgdbMTGCard.tcgdbMTGCardName,
                tcgdbMTGCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
                tcgdbMTGCardImageURL: tcgdbMTGCard.tcgdbMTGCardImageURL,
                tcgdbMTGCardTCGPlayerData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
                tcgdbMTGCardTCGPlayerSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
                tcgdbMTGCardScryfallData: tcgdbMTGCard.tcgdbMTGCardScryfallData
            };

            tcgdbMTGCardDTOs.push(tcgdbMTGCardDTO);
        }

        return tcgdbMTGCardDTOs;
    
    }

    async getTCGdbMTGCardsBySetName(setName: string) {

        let tcgdbMTGCardDTOs: TCGdbMTGCardDTO[] = [];
        let tcgdbMTGSetDTO = await this.tcgdbMTGSetService.getTCGdbMTGSetBySetName(setName);

         //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSetDTO == null) {
            return null;
        }

        //GET TCGDB CARDS BY SET ABBREVIATION;
        let tcgdbMTGCards = await this.tcgdbMTGCardRepository.find({
            where: {
                tcgdbMTGCardSetAbbreviation: tcgdbMTGSetDTO.tcgdbMTGSetAbbreviation,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGCards == null) {
            return null;
        }
        
        for(let i = 0; i < tcgdbMTGCards.length; i++) {
            let tcgdbMTGCard = tcgdbMTGCards[i];

            let tcgdbMTGCardDTO: TCGdbMTGCardDTO = {
                tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
                tcgdbMTGCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
                tcgdbMTGCardScryfallId: tcgdbMTGCard.tcgdbMTGCardScryfallId,
                tcgdbMTGCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
                tcgdbMTGCardSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
                tcgdbMTGCardRarityAbbreviation: tcgdbMTGCard.tcgdbMTGCardRarityAbbreviation,
                tcgdbMTGCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
                tcgdbMTGCardName: tcgdbMTGCard.tcgdbMTGCardName,
                tcgdbMTGCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
                tcgdbMTGCardImageURL: tcgdbMTGCard.tcgdbMTGCardImageURL,
                tcgdbMTGCardTCGPlayerData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
                tcgdbMTGCardTCGPlayerSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
                tcgdbMTGCardScryfallData: tcgdbMTGCard.tcgdbMTGCardScryfallData
            };

            tcgdbMTGCardDTOs.push(tcgdbMTGCardDTO);
        }

        let tcgdbMTGSetCardDTO: TCGdbMTGSetCardDTO = {
            tcgdbMTGSet: tcgdbMTGSetDTO,
            tcgdbMTGCards: tcgdbMTGCardDTOs,
        }
        
        return tcgdbMTGSetCardDTO;
    }

    async getTCGdbMTGCardsBySetAbbreviation(setAbbreviation: string) {

        let tcgdbMTGCardDTOs: TCGdbMTGCardDTO[] = [];
        let tcgdbMTGSetDTO = await this.tcgdbMTGSetService.getTCGdbMTGSetBySetAbbreviation(setAbbreviation);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSetDTO == null) {
            return null;
        }

        //GET TCGDB CARDS BY SET ABBREVIATION;
        let tcgdbMTGCards = await this.tcgdbMTGCardRepository.find({
            where: {
                tcgdbMTGCardSetAbbreviation: setAbbreviation,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGCards == null) {
            return null;
        }

        for(let i = 0; i < tcgdbMTGCards.length; i++) {
            let tcgdbMTGCard = tcgdbMTGCards[i];

            let tcgdbMTGCardDTO: TCGdbMTGCardDTO = {
                tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
                tcgdbMTGCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
                tcgdbMTGCardScryfallId: tcgdbMTGCard.tcgdbMTGCardScryfallId,
                tcgdbMTGCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
                tcgdbMTGCardSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
                tcgdbMTGCardRarityAbbreviation: tcgdbMTGCard.tcgdbMTGCardRarityAbbreviation,
                tcgdbMTGCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
                tcgdbMTGCardName: tcgdbMTGCard.tcgdbMTGCardName,
                tcgdbMTGCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
                tcgdbMTGCardImageURL: tcgdbMTGCard.tcgdbMTGCardImageURL,
                tcgdbMTGCardTCGPlayerData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
                tcgdbMTGCardTCGPlayerSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
                tcgdbMTGCardScryfallData: tcgdbMTGCard.tcgdbMTGCardScryfallData
            };

            tcgdbMTGCardDTOs.push(tcgdbMTGCardDTO);
        }
        
        let tcgdbMTGSetCardDTO: TCGdbMTGSetCardDTO = {
            tcgdbMTGSet: tcgdbMTGSetDTO,
            tcgdbMTGCards: tcgdbMTGCardDTOs,
        }
        
        return tcgdbMTGSetCardDTO;
    }

    async createTCGdbMTGCards() {
        let tcgdbMTGCardRecordCount = 0;

        let tcgPlayerMTGCards = await this.tcgPlayerMTGCardService.getTCGPlayerMTGCards();

        for(let i=0; i < tcgPlayerMTGCards.length; i++) {
            let tcgPlayerMTGCard = tcgPlayerMTGCards[i];

            //CHECK TO SEE IF THE CARD EXISTS;
            let tcgdbMTGCard = await this.getTCGdbMTGCardByTCGPlayerId(tcgPlayerMTGCard.tcgPlayerMTGCardProductId);

            //CARD DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGCard == null) {

                //GET THE SET NAME;
                let tcgdbMTGSetDTO = await this.tcgdbMTGSetService.getTCGdbMTGSetByTCGPlayerId(tcgPlayerMTGCard.tcgPlayerMTGCardGroupId);
                let tcgdbMTGSetName = "";
                
                if(tcgdbMTGSetDTO != null) {
                    tcgdbMTGSetName = tcgdbMTGSetDTO.tcgdbMTGSetName;
                }

                let tcgdbMTGCardNumber = "0";
                let tcgdbMTGCardRarityAbbreviation = "U";

                try{
                    let tcgPlayerMTGCardData: any = tcgPlayerMTGCard.tcgPlayerMTGCardData;
                    
                   if(tcgPlayerMTGCardData != null) {
                        let tcgdbMTGCardNumberObject = tcgPlayerMTGCardData.extendedData.find(item => item.name === 'Number');
                        tcgdbMTGCardNumber = tcgdbMTGCardNumberObject ? tcgdbMTGCardNumberObject.value : "0";
                        let tcgdbMTGCardRarityObject = tcgPlayerMTGCardData.extendedData.find(item => item.name === 'Rarity');
                        tcgdbMTGCardRarityAbbreviation = tcgdbMTGCardRarityObject ? tcgdbMTGCardRarityObject.value : "U";
                    }
                }
                catch(error) {
                    console.log("Error parsing extended data: " + error);
                }

                const newTCGdgMTGCard = this.tcgdbMTGCardRepository.create({
                    tcgdbMTGCardTCGPlayerId: tcgPlayerMTGCard.tcgPlayerMTGCardProductId,
                    tcgdbMTGCardSetName: tcgdbMTGSetName,
                    tcgdbMTGCardSetAbbreviation: tcgPlayerMTGCard.tcgPlayerMTGCardSetAbbreviation,
                    tcgdbMTGCardRarityAbbreviation: tcgdbMTGCardRarityAbbreviation,
                    tcgdbMTGCardNumber: tcgdbMTGCardNumber,
                    tcgdbMTGCardName: tcgPlayerMTGCard.tcgPlayerMTGCardName,
                    tcgdbMTGCardCleanName: tcgPlayerMTGCard.tcgPlayerMTGCardCleanName,
                    tcgdbMTGCardImageURL: tcgPlayerMTGCard.tcgPlayerMTGCardImageURL,
                    tcgdbMTGCardTCGPlayerData: tcgPlayerMTGCard.tcgPlayerMTGCardData,
                    tcgdbMTGCardTCGPlayerSKUs: tcgPlayerMTGCard.tcgPlayerMTGCardSKUs,
                });

                let scryfallMTGCard = await this.scryfallMTGCardService.getScryfallMTGCardByTCGPlayerId(tcgPlayerMTGCard.tcgPlayerMTGCardProductId);

                if(scryfallMTGCard != null) {
                    newTCGdgMTGCard.tcgdbMTGCardScryfallId = scryfallMTGCard.scryfallMTGCardScryfallId;
                    newTCGdgMTGCard.tcgdbMTGCardScryfallData = scryfallMTGCard.scryfallMTGCardData;
                }


                await this.tcgdbMTGCardRepository.save(newTCGdgMTGCard);

                tcgdbMTGCardRecordCount++;
            }
        }

        return tcgdbMTGCardRecordCount;

    }
}


