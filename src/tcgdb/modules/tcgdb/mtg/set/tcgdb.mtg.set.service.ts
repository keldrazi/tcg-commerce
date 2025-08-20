import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGSetService } from 'src/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.service';
import { ScryfallMTGSetService } from 'src/tcgdb/modules/scryfall/mtg/set/scryfall.mtg.set.service';
import { TCGdbMTGSetDTO } from './dto/tcgdb.mtg.set.dto';
import { TCGdbMTGSet } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.entity';

@Injectable()
export class TCGdbMTGSetService {

    constructor(
        @InjectRepository(TCGdbMTGSet) private tcgdbMTGSetRepository: Repository<TCGdbMTGSet>, 
        private tcgPlayerMTGSetService: TCGPlayerMTGSetService,
        private scryfallMTGSetService: ScryfallMTGSetService,
    ) {}
    
    async getTCGdbMTGSets() {
        
        let tcgdbMTGSetDTOs: TCGdbMTGSetDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbMTGSets = await this.tcgdbMTGSetRepository.find();

        for(let i=0; i < tcgdbMTGSets.length; i++) {
            const tcgdbMTGSet = tcgdbMTGSets[i];
            
            let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

            tcgdbMTGSetDTOs.push(tcgdbMTGSetDTO);
        }

        return tcgdbMTGSetDTOs;
    }

    async getTCGdbMTGSetByTCGdbId(tcgdbId: string) {

        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetId: tcgdbId,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

        return tcgdbMTGSetDTO;
    }
    
    async getTCGdbMTGSetByTCGPlayerId(tcgPlayerId: number) {

        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetTCGPlayerId: tcgPlayerId,
            }
        })

        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });
        
        return tcgdbMTGSetDTO;
    }

    
    async getTCGdbMTGSetBySetCode(setCode: string) {

        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetCode: setCode,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

        return tcgdbMTGSetDTO;
        
    }

    async getTCGdbMTGSetBySetName(setName: string) {
        
        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetName: setName,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

        return tcgdbMTGSetDTO;
    }
    

    async createTCGdbMTGSets() {
        
        let tcgdbMTGSetRecordCount = 0;

        let tcgPlayerMTGSets = await this.tcgPlayerMTGSetService.getTCGPlayerMTGSets();

        for(let i=0; i < tcgPlayerMTGSets.length; i++) {
            let tcgPlayerMTGSet = tcgPlayerMTGSets[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGSet = await this.getTCGdbMTGSetByTCGPlayerId(tcgPlayerMTGSet.tcgPlayerMTGSetGroupId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGSet == null) {
                const newTCGdgMTGSet = this.tcgdbMTGSetRepository.create({
                    tcgdbMTGSetTCGPlayerId: tcgPlayerMTGSet.tcgPlayerMTGSetGroupId,
                    tcgdbMTGSetCode: tcgPlayerMTGSet.tcgPlayerMTGSetCode,
                    tcgdbMTGSetName: tcgPlayerMTGSet.tcgPlayerMTGSetName,
                    tcgdbMTGSetPublishedOn: tcgPlayerMTGSet.tcgPlayerMTGSetPublishedOn,
                    tcgdbMTGSetTotalCards: tcgPlayerMTGSet.tcgPlayerMTGSetTotalCards,
                });

                let scryfallMTGSet = await this.scryfallMTGSetService.getScryfallMTGSetByTCGPlayerId(tcgPlayerMTGSet.tcgPlayerMTGSetGroupId);

                if(scryfallMTGSet != null) {
                    newTCGdgMTGSet.tcgdbMTGSetScryfallId = scryfallMTGSet.scryfallMTGSetScryfallId;
                }

                await this.tcgdbMTGSetRepository.save(newTCGdgMTGSet);

                tcgdbMTGSetRecordCount++;
            }
        }

        return tcgdbMTGSetRecordCount;

    }
}


