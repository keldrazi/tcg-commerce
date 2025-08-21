import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonRarityService } from 'src/tcgdb/modules/tcgplayer/pokemon/rarity/tcgplayer.pokemon.rarity.service';
import { TCGdbPokemonRarityDTO } from './dto/tcgdb.pokemon.rarity.dto';
import { TCGdbPokemonRarity } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/rarity/tcgdb.pokemon.rarity.entity';

@Injectable()
export class TCGdbPokemonRarityService {

    constructor(
        @InjectRepository(TCGdbPokemonRarity) private tcgdbPokemonRarityRepository: Repository<TCGdbPokemonRarity>, 
        private tcgPlayerPokemonRarityService: TCGPlayerPokemonRarityService,
    ) {}
    
    async getTCGdbPokemonRarities() {
        
        let tcgdbPokemonRarityDTOs: TCGdbPokemonRarityDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbPokemonRaritys = await this.tcgdbPokemonRarityRepository.find();

        for(let i=0; i < tcgdbPokemonRaritys.length; i++) {
            const tcgdbPokemonRarity = tcgdbPokemonRaritys[i];
            
            let tcgdbPokemonRarityDTO: TCGdbPokemonRarityDTO = ({ ...tcgdbPokemonRarity });
                
            tcgdbPokemonRarityDTOs.push(tcgdbPokemonRarityDTO);
        }

        return tcgdbPokemonRarityDTOs;
    }

    async getTCGdbPokemonRarityByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbPokemonRarity = await this.tcgdbPokemonRarityRepository.findOne({
            where: {
                tcgdbPokemonRarityTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbPokemonRarity == null) {
            return null;
        }

        let tcgdbPokemonRarityDTO: TCGdbPokemonRarityDTO = ({ ...tcgdbPokemonRarity });

        return tcgdbPokemonRarityDTO;
    }

    async createTCGdbPokemonRarities() {
        
        let tcgdbPokemonRarityRecordCount = 0;

        let tcgPlayerPokemonRaritys = await this.tcgPlayerPokemonRarityService.getTCGPlayerPokemonRarities();

        for(let i=0; i < tcgPlayerPokemonRaritys.length; i++) {
            let tcgPlayerPokemonRarity = tcgPlayerPokemonRaritys[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbPokemonRarity = await this.getTCGdbPokemonRarityByTCGPlayerId(tcgPlayerPokemonRarity.tcgPlayerPokemonRarityId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbPokemonRarity == null) {
                const newTCGdgPokemonRarity = this.tcgdbPokemonRarityRepository.create({
                    tcgdbPokemonRarityTCGPlayerId: tcgPlayerPokemonRarity.tcgPlayerPokemonRarityId,
                    tcgdbPokemonRarityName: tcgPlayerPokemonRarity.tcgPlayerPokemonRarityDisplayText,
                    tcgdbPokemonRarityCode: tcgPlayerPokemonRarity.tcgPlayerPokemonRarityDBValue
                });

                await this.tcgdbPokemonRarityRepository.save(newTCGdgPokemonRarity);

                tcgdbPokemonRarityRecordCount++;
            }
        }

        return tcgdbPokemonRarityRecordCount;

    }
}


