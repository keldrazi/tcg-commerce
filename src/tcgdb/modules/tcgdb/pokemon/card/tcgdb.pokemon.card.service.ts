import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.service';
import { TCGPlayerPokemonCardService } from 'src/tcgdb/modules/tcgplayer/pokemon/card/tcgplayer.pokemon.card.service';
import { PokemonTCGPokemonCardService } from 'src/tcgdb/modules/pokemontcg/pokemon/card/pokemontcg.pokemon.card.service';
import { TCGdbPokemonCardsDTO, TCGdbPokemonCardDTO } from './dto/tcgdb.pokemon.card.dto';
import { TCGdbPokemonCard } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.entity';

@Injectable()
export class TCGdbPokemonCardService {

    constructor(
        @InjectRepository(TCGdbPokemonCard) private tcgdbPokemonCardRepository: Repository<TCGdbPokemonCard>, 
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
        private tcgPlayerPokemonCardService: TCGPlayerPokemonCardService,
        private pokemonTCGPokemonCardService: PokemonTCGPokemonCardService,
    ) {}

    async getTCGdbPokemonCardByTCGPlayerId(tcgPlayerId: number) {

        const tcgdbPokemonCard = await this.tcgdbPokemonCardRepository.findOne({
            where: {
                tcgdbPokemonCardTCGPlayerId: tcgPlayerId,
            }
        })

        if(tcgdbPokemonCard == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return null;
        }

        let tcgdbPokemonCardDTO: TCGdbPokemonCardDTO = ({ ...tcgdbPokemonCard });

        return tcgdbPokemonCardDTO;
    }

    async getTCGdbPokemonCardByTCGdbId(tcgdbPokemonCardId: string) {

        const tcgdbPokemonCard = await this.tcgdbPokemonCardRepository.findOne({
            where: {
                tcgdbPokemonCardId: tcgdbPokemonCardId,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonCard == null) {
            return null;
        }

        let tcgdbPokemonCardDTO: TCGdbPokemonCardDTO = ({ ...tcgdbPokemonCard });

        return tcgdbPokemonCardDTO;
    }

    async getTCGdbPokemonCardByCardAndSetName(cardName: string, setName: string) {
    
        let tcgdbPokemonSetDTO = await this.tcgdbPokemonSetService.getTCGdbPokemonSetBySetName(setName);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonSetDTO == null) {
            return null;
        }

        let tcgdbPokemonCard = await this.tcgdbPokemonCardRepository.findOne({
            where: {
                tcgdbPokemonCardName: cardName,
                tcgdbPokemonCardSetCode: tcgdbPokemonSetDTO.tcgdbPokemonSetCode,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonCard == null) {
            return null;
        }

        let tcgdbPokemonCardDTO: TCGdbPokemonCardDTO = ({ ...tcgdbPokemonCard });

        return tcgdbPokemonCardDTO;

    }

    async getTCGdbPokemonCardsByCardName(cardName: string) {

        let tcgdbPokemonCards = await this.tcgdbPokemonCardRepository.find({
            where: {
                tcgdbPokemonCardName: cardName,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonCards == null) {
            return null;
        }

        let tcgdbPokemonCardDTOs: TCGdbPokemonCardDTO[] = [];

        for(let i=0; i < tcgdbPokemonCards.length; i++) {
            let tcgdbPokemonCard = tcgdbPokemonCards[i];

            let tcgdbPokemonCardDTO: TCGdbPokemonCardDTO = ({ ...tcgdbPokemonCard });

            tcgdbPokemonCardDTOs.push(tcgdbPokemonCardDTO);
        }

        return tcgdbPokemonCardDTOs;
    
    }

    async getTCGdbPokemonCardsBySetCode(setCode: string) {

        let tcgdbPokemonCardDTOs: TCGdbPokemonCardDTO[] = [];
        let tcgdbPokemonSetDTO = await this.tcgdbPokemonSetService.getTCGdbPokemonSetBySetCode(setCode);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonSetDTO == null) {
            return null;
        }

        const tcgdbPokemonCards = await this.tcgdbPokemonCardRepository.find({
            where: {
                tcgdbPokemonCardSetCode: setCode,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonCards == null) {
            return null;
        }

        for(let i = 0; i < tcgdbPokemonCards.length; i++) {
            let tcgdbPokemonCard = tcgdbPokemonCards[i];

            let tcgdbPokemonCardDTO: TCGdbPokemonCardDTO = ({ ...tcgdbPokemonCard });onCardTCGPlayerSKUs: tcgdbPokemonCard.tcgdbPokemonCardTCGPlayerSKUs,

            tcgdbPokemonCardDTOs.push(tcgdbPokemonCardDTO);
        }
        

        let tcgdbPokemonCardsDTO: TCGdbPokemonCardsDTO = {
            tcgdbPokemonSet: tcgdbPokemonSetDTO,
            tcgdbPokemonCards: tcgdbPokemonCardDTOs,
        }
        
        return tcgdbPokemonCardsDTO;
    }

    async getTCGdbPokemonCardsBySetName(setName: string) {

        let tcgdbPokemonCardDTOs: TCGdbPokemonCardDTO[] = [];
        let tcgdbPokemonSetDTO = await this.tcgdbPokemonSetService.getTCGdbPokemonSetBySetCode(setName);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonSetDTO == null) {
            return null;
        }

        const tcgdbPokemonCards = await this.tcgdbPokemonCardRepository.find({
            where: {
                tcgdbPokemonCardSetCode: tcgdbPokemonSetDTO.tcgdbPokemonSetCode,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonCards == null) {
            return null;
        }

        for(let i = 0; i < tcgdbPokemonCards.length; i++) {
            let tcgdbPokemonCard = tcgdbPokemonCards[i];

            let tcgdbPokemonCardDTO: TCGdbPokemonCardDTO = {
                tcgdbPokemonCardId: tcgdbPokemonCard.tcgdbPokemonCardId,
                tcgdbPokemonCardTCGPlayerId: tcgdbPokemonCard.tcgdbPokemonCardTCGPlayerId,
                tcgdbPokemonCardPokemonTCGId: tcgdbPokemonCard.tcgdbPokemonCardPokemonTCGId,
                tcgdbPokemonCardSetCode: tcgdbPokemonCard.tcgdbPokemonCardSetCode,
                tcgdbPokemonCardName: tcgdbPokemonCard.tcgdbPokemonCardName,
                tcgdbPokemonCardCleanName: tcgdbPokemonCard.tcgdbPokemonCardCleanName,
                tcgdbPokemonCardImageURL: tcgdbPokemonCard.tcgdbPokemonCardImageURL,
                tcgdbPokemonCardData: tcgdbPokemonCard.tcgdbPokemonCardData,
                tcgdbPokemonCardTCGPlayerSKUs: tcgdbPokemonCard.tcgdbPokemonCardTCGPlayerSKUs,
            };

            tcgdbPokemonCardDTOs.push(tcgdbPokemonCardDTO);
        }
        
        let tcgdbPokemonCardsDTO: TCGdbPokemonCardsDTO = {
            tcgdbPokemonSet: tcgdbPokemonSetDTO,
            tcgdbPokemonCards: tcgdbPokemonCardDTOs,
        }
        
        return tcgdbPokemonCardsDTO;
    }

    

    async createTCGdbPokemonCards() {
        let tcgdbPokemonCardRecordCount = 0;

        let tcgPlayerPokemonCards = await this.tcgPlayerPokemonCardService.getTCGPlayerPokemonCards();

        for(let i=0; i < tcgPlayerPokemonCards.length; i++) {
            let tcgPlayerPokemonCard = tcgPlayerPokemonCards[i];

            //CHECK TO SEE IF THE CARD EXISTS;
            let tcgdbPokemonCard = await this.getTCGdbPokemonCardByTCGPlayerId(tcgPlayerPokemonCard.tcgPlayerPokemonCardProductId);

            //CARD DOESN'T EXIST - CREATE IT;
            if(tcgdbPokemonCard == null) {
                const newTCGdgPokemonCard = this.tcgdbPokemonCardRepository.create({
                    tcgdbPokemonCardTCGPlayerId: tcgPlayerPokemonCard.tcgPlayerPokemonCardProductId,
                    tcgdbPokemonCardSetCode: tcgPlayerPokemonCard.tcgPlayerPokemonCardSetCode,
                    tcgdbPokemonCardName: tcgPlayerPokemonCard.tcgPlayerPokemonCardName,
                    tcgdbPokemonCardCleanName: tcgPlayerPokemonCard.tcgPlayerPokemonCardCleanName,
                    tcgdbPokemonCardImageURL: tcgPlayerPokemonCard.tcgPlayerPokemonCardImageURL,
                    tcgdbPokemonCardData: tcgPlayerPokemonCard.tcgPlayerPokemonCardData,
                    tcgdbPokemonCardTCGPlayerSKUs: tcgPlayerPokemonCard.tcgPlayerPokemonCardSKUs,
                });

                let scryfallPokemonCard = await this.pokemonTCGPokemonCardService.getPokemonTCGPokemonCardByTCGPlayerId(tcgPlayerPokemonCard.tcgPlayerPokemonCardProductId);

                if(scryfallPokemonCard != null) {
                    newTCGdgPokemonCard.tcgdbPokemonCardPokemonTCGId = scryfallPokemonCard.pokemonTCGPokemonCardPokemonTCGId;
                }

                await this.tcgdbPokemonCardRepository.save(newTCGdgPokemonCard);

                tcgdbPokemonCardRecordCount++;
            }
        }

        return tcgdbPokemonCardRecordCount;
    } 
}


