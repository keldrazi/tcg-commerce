import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerPokemonRarity } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/rarity/tcgplayer.pokemon.rarity.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIRarityService } from 'src/tcgdb/modules/tcgplayer/api/rarity/tcgplayer.api.rarity.service';

@Injectable()
export class TCGPlayerPokemonRarityService {

    constructor(
        @InjectRepository(TCGPlayerPokemonRarity) private tcgPlayerPokemonRarityRepository: Repository<TCGPlayerPokemonRarity>, 
        private tcgPlayerAPIRarityService: TCGPlayerAPIRarityService,
    ) {}

    private tcgPlayerPokemonCategoryId = '1';

    async getTCGPlayerPokemonRarities() {
        return await this.tcgPlayerPokemonRarityRepository.find();
    }

    async getTCGPlayerPokemonRarityByRarityDBValue(rarityDBValue: string) {
        let tcgPlayerPokemonRarity = await this.tcgPlayerPokemonRarityRepository.findOne({
            where: {
                tcgPlayerPokemonRarityDBValue: rarityDBValue,
            }
        });

        return tcgPlayerPokemonRarity;
    }

    async createTCGPlayerPokemonRarities() {

        let tcgPlayerPokemonRarityRecordCount = 0;
        let tcgPlayerPokemonRarities = await this.tcgPlayerAPIRarityService.getTCGPlayerAPIRaritysByCategoryId(this.tcgPlayerPokemonCategoryId);
        
        for(let i = 0; i < tcgPlayerPokemonRarities.length; i++) {
            const tcgPlayerPokemonRarity: any = tcgPlayerPokemonRarities[i];
            
            //CHECK TO SEE IF THE SET EXISTS;
            const tcgPlayerPokemonRarityCheck = await this.getTCGPlayerPokemonRarityByRarityDBValue(tcgPlayerPokemonRarity.dbValue);

            //SET DOESN'T EXIST - CREATE SET;
            if(tcgPlayerPokemonRarityCheck == null) {
            
                const newTCGPlayerPokemonRarity = this.tcgPlayerPokemonRarityRepository.create({
                    tcgPlayerPokemonRarityId: tcgPlayerPokemonRarity.rarityId,
                    tcgPlayerPokemonRarityDisplayText: tcgPlayerPokemonRarity.displayText,
                    tcgPlayerPokemonRarityDBValue: tcgPlayerPokemonRarity.dbValue,
                });

                await this.tcgPlayerPokemonRarityRepository.save(newTCGPlayerPokemonRarity);

                tcgPlayerPokemonRarityRecordCount++;
            }
        }
        
        return tcgPlayerPokemonRarityRecordCount;
    }
}


