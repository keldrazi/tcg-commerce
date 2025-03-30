import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { ScryfallMTGSet } from 'src/typeorm/entities/tcgdb/modules/scryfall/mtg/set/scryfall.mtg.set.entity';
import { ScryfallAPISetService } from 'src/tcgdb/modules/scryfall/api/set/scryfall.api.set.service';

@Injectable()
export class ScryfallMTGSetService {

    constructor(
        @InjectRepository(ScryfallMTGSet) private scryfallMTGSetRepository: Repository<ScryfallMTGSet>,
        private httpService: HttpService,
        private scryfallAPISetService: ScryfallAPISetService,
    ) {}

    
    async getScryfallMTGSets() {
        const scryfallMTGSets = await this.scryfallMTGSetRepository.find();

        return scryfallMTGSets;
    }

    async getScryfallMTGSetByScryfallId(scryfallId: string) {
        const scryfallMTGSet = await this.scryfallMTGSetRepository.findOne({
            where: {
                scryfallMTGSetScryfallId: scryfallId,
            }
        });

        return scryfallMTGSet;

    }

    async getScryfallMTGSetByTCGPlayerId(tcgPlayerId: number) {
        const scryfallMTGSet = await this.scryfallMTGSetRepository.findOne({
            where: {
                scryfallMTGSetTCGPlayerId: tcgPlayerId,
            }
        });

        return scryfallMTGSet;
        
    }

    async createScryfallMTGSets() {
        
        let scryfallMTGSetRecordCount = 0;

        let scryfallMTGSets = await this.scryfallAPISetService.getScryfallAPISets();

        for(let i = 0; i < scryfallMTGSets.length; i++) {
            
            const scryfallMTGSet = scryfallMTGSets[i];
            
            //CHECK TO SEE IF THE SET EXISTS;
            const scryfallSetCheck = await this.getScryfallMTGSetByScryfallId(scryfallMTGSet.id);
            
            //SET DOESN'T EXIST - CREATE SET;
            if(scryfallSetCheck == null) {
                const newScryfallMTGSet = this.scryfallMTGSetRepository.create({ 
                    scryfallMTGSetScryfallId: scryfallMTGSet.id,
                    scryfallMTGSetTCGPlayerId: scryfallMTGSet.tcgplayer_id,
                    scryfallMTGSetCode: scryfallMTGSet.code,
                    scryfallMTGSetName: scryfallMTGSet.name,
                    scryfallMTGSetReleasedAt: scryfallMTGSet.released_at,
                    scryfallMTGSetCardCount: scryfallMTGSet.card_count,
                    scryfallMTGSetDigital: scryfallMTGSet.digital,
                    scryfallMTGSetSearchURI: scryfallMTGSet.search_uri,
                    scryfallMTGSetIconSvgURI: scryfallMTGSet.icon_svg_uri,
                    scryfallMTGSetData: scryfallMTGSet,
                });

                this.scryfallMTGSetRepository.save(newScryfallMTGSet);
                
                scryfallMTGSetRecordCount++;
            }
        }

        return scryfallMTGSetRecordCount;
    }
}


