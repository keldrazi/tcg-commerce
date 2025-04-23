import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGRarityService } from 'src/tcgdb/modules/tcgplayer/mtg/rarity/tcgplayer.mtg.rarity.service';
import { TCGdbMTGRarityDTO } from './dto/tcgdb.mtg.rarity.dto';
import { TCGdbMTGRarity } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/rarity/tcgdb.mtg.rarity.entity';

@Injectable()
export class TCGdbMTGRarityService {

    constructor(
        @InjectRepository(TCGdbMTGRarity) private tcgdbMTGRarityRepository: Repository<TCGdbMTGRarity>, 
        private tcgPlayerMTGRarityService: TCGPlayerMTGRarityService,
    ) {}
    
    async getTCGdbMTGRarities() {
        
        let tcgdbMTGRarityDTOs: TCGdbMTGRarityDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbMTGRaritys = await this.tcgdbMTGRarityRepository.find();

        for(let i=0; i < tcgdbMTGRaritys.length; i++) {
            const tcgdbMTGRarity = tcgdbMTGRaritys[i];
            
            let tcgdbMTGRarityDTO: TCGdbMTGRarityDTO = {
                tcgdbMTGRarityId: tcgdbMTGRarity.tcgdbMTGRarityId,
                tcgdbMTGRarityTCGPlayerId: tcgdbMTGRarity.tcgdbMTGRarityTCGPlayerId,
                tcgdbMTGRarityName: tcgdbMTGRarity.tcgdbMTGRarityName,
                tcgdbMTGRarityAbbreviation: tcgdbMTGRarity.tcgdbMTGRarityAbbreviation,
                tcgdbMTGRarityCreateDate: tcgdbMTGRarity.tcgdbMTGRarityCreateDate,
                tcgdbMTGRarityUpdateDate: tcgdbMTGRarity.tcgdbMTGRarityUpdateDate,
            }

            tcgdbMTGRarityDTOs.push(tcgdbMTGRarityDTO);
        }

        return tcgdbMTGRarityDTOs;
    }

    async getTCGdbMTGRarityByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbMTGRarity = await this.tcgdbMTGRarityRepository.findOne({
            where: {
                tcgdbMTGRarityTCGPlayerId: tcgPlayerId,
            }
        });

        return tcgdbMTGRarity;
    }

    async createTCGdbMTGRarities() {
        
        let tcgdbMTGRarityRecordCount = 0;

        let tcgPlayerMTGRaritys = await this.tcgPlayerMTGRarityService.getTCGPlayerMTGRarities();

        for(let i=0; i < tcgPlayerMTGRaritys.length; i++) {
            let tcgPlayerMTGRarity = tcgPlayerMTGRaritys[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGRarity = await this.getTCGdbMTGRarityByTCGPlayerId(tcgPlayerMTGRarity.tcgPlayerMTGRarityId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGRarity == null) {
                const newTCGdgMTGRarity = this.tcgdbMTGRarityRepository.create({
                    tcgdbMTGRarityTCGPlayerId: tcgPlayerMTGRarity.tcgPlayerMTGRarityId,
                    tcgdbMTGRarityName: tcgPlayerMTGRarity.tcgPlayerMTGRarityDisplayText,
                    tcgdbMTGRarityAbbreviation: tcgPlayerMTGRarity.tcgPlayerMTGRarityDBValue
                });

                await this.tcgdbMTGRarityRepository.save(newTCGdgMTGRarity);

                tcgdbMTGRarityRecordCount++;
            }
        }

        return tcgdbMTGRarityRecordCount;

    }
}


