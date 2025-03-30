import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PokemonTCGPokemonCard } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemontcgtcg/pokemon/card/pokemontcg.pokemon.card.entity';
import { PokemonTCGPokemonSetService } from 'src/tcgdb/modules/pokemontcg/pokemon/set/pokemontcg.pokemon.set.service'
import { PokemonTCGAPICardService } from 'src/tcgdb/modules/pokemontcg/api/card/pokemontcg.api.card.service';


@Injectable()
export class PokemonTCGPokemonCardService {

    constructor(
        @InjectRepository(PokemonTCGPokemonCard) private pokemonTCGPokemonCardRepository: Repository<PokemonTCGPokemonCard>,
        private pokemonTCGPokemonSetService: PokemonTCGPokemonSetService,
        private pokemonTCGAPICardService: PokemonTCGAPICardService,
    ) {}

    async getPokemonTCGPokemonCardByPokemonTCGId(pokemonTCGId: string) {
        const pokemonTCGPokemonCard = await this.pokemonTCGPokemonCardRepository.findOne({
            where: {
                pokemonTCGPokemonCardPokemonTCGId: pokemonTCGId,
            }
        });

        return pokemonTCGPokemonCard;

    }

    async getPokemonTCGPokemonCardByTCGPlayerId(tcgPlayerId: number) {
        const pokemonTCGPokemonCard = await this.pokemonTCGPokemonCardRepository.findOne({
            where: {
                pokemonTCGPokemonCardTCGPlayerId: tcgPlayerId,
            }
        });

        return pokemonTCGPokemonCard;
    }

    async createPokemonTCGPokemonCards() {

        const pokemonTCGPokemonSets = await this.pokemonTCGPokemonSetService.getPokemonTCGPokemonSets();

        let pokemonTCGPokemonCardRecordCount = 0;

        for(let i = 0; i < pokemonTCGPokemonSets.length; i++) {

            let pokemonTCGPokemonSet = pokemonTCGPokemonSets[i];

            let pokemonTCGPokemonCards = await this.pokemonTCGAPICardService.getPokemonTCGAPICardsByPokemonTCGSet(pokemonTCGPokemonSet);

            for(let j = 0; j < pokemonTCGPokemonCards.length; j++) {
                const pokemonTCGPokemonCard = pokemonTCGPokemonCards[j];

                //CHECK TO MAKE SURE THE CARD DOESN'T ALREADY EXIST;
                const pokemonTCGPokemonCardCheck = await this.getPokemonTCGPokemonCardByPokemonTCGId(pokemonTCGPokemonCard.id);

                //IF THE CARD DOESN'T EXIST - CREATE THE CARD;
                if(pokemonTCGPokemonCardCheck == null) {

                    const newPokemonTCGPokemonCard = this.pokemonTCGPokemonCardRepository.create({
                        pokemonTCGPokemonCardPokemonTCGId: pokemonTCGPokemonCard.id,
                        pokemonTCGPokemonCardSetId: pokemonTCGPokemonSet.pokemonTCGPokemonSetId,
                        pokemonTCGPokemonCardName: pokemonTCGPokemonCard.name,
                        pokemonTCGPokemonCardSupertype: pokemonTCGPokemonCard.supertype,
                        pokemonTCGPokemonCardData: pokemonTCGPokemonCard,
                    });

                    await this.pokemonTCGPokemonCardRepository.save(newPokemonTCGPokemonCard);

                    pokemonTCGPokemonCardRecordCount++;
                }
            }

        }

        return pokemonTCGPokemonCardRecordCount;
    }

    async updatePokemonTCGPokemonCards() {

        const pokemonTCGPokemonSets = await this.pokemonTCGPokemonSetService.getPokemonTCGPokemonSets();

        let pokemonTCGPokemonCardRecordCount = 0;

        for(let i = 0; i < pokemonTCGPokemonSets.length; i++) {

            let pokemonTCGPokemonSet = pokemonTCGPokemonSets[i];

            let pokemonTCGPokemonCards = await this.pokemonTCGAPICardService.getPokemonTCGAPICardsByPokemonTCGSet(pokemonTCGPokemonSet);

            for(let j = 0; j < pokemonTCGPokemonCards.length; j++) {
                const pokemonTCGPokemonCard = pokemonTCGPokemonCards[j];

                //CHECK TO MAKE SURE THE CARD EXISTS;
                let pokemonTCGPokemonCardUpdate = await this.getPokemonTCGPokemonCardByPokemonTCGId(pokemonTCGPokemonCard.id);

                //IF THE CARD EXISTS - UPDATE THE CARD;
                if(pokemonTCGPokemonCardUpdate != null) {
                    pokemonTCGPokemonCardUpdate.pokemonTCGPokemonCardData =  pokemonTCGPokemonCard,
                    pokemonTCGPokemonCardUpdate.pokemonTCGPokemonCardUpdateDate = new Date();

                    await this.pokemonTCGPokemonCardRepository.save(pokemonTCGPokemonCardUpdate);

                    pokemonTCGPokemonCardRecordCount++;
                }
            }

        }

        return pokemonTCGPokemonCardRecordCount;
    }
    
}


