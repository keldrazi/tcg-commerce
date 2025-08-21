import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonPrintingService } from 'src/tcgdb/modules/tcgplayer/pokemon/printing/tcgplayer.pokemon.printing.service';
import { TCGdbPokemonPrintingDTO } from './dto/tcgdb.pokemon.printing.dto';
import { TCGdbPokemonPrinting } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/printing/tcgdb.pokemon.printing.entity';

@Injectable()
export class TCGdbPokemonPrintingService {

    constructor(
        @InjectRepository(TCGdbPokemonPrinting) private tcgdbPokemonPrintingRepository: Repository<TCGdbPokemonPrinting>, 
        private tcgPlayerPokemonPrintingService: TCGPlayerPokemonPrintingService,
    ) {}
    
    async getTCGdbPokemonPrintings() {
        
        let tcgdbPokemonPrintingDTOs: TCGdbPokemonPrintingDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbPokemonPrintings = await this.tcgdbPokemonPrintingRepository.find();

        for(let i=0; i < tcgdbPokemonPrintings.length; i++) {
            const tcgdbPokemonPrinting = tcgdbPokemonPrintings[i];
            
            let tcgdbPokemonPrintingDTO: TCGdbPokemonPrintingDTO = ({ ...tcgdbPokemonPrinting });

            tcgdbPokemonPrintingDTOs.push(tcgdbPokemonPrintingDTO);
        }

        return tcgdbPokemonPrintingDTOs;
    }

    async getTCGdbPokemonPrintingByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbPokemonPrinting = await this.tcgdbPokemonPrintingRepository.findOne({
            where: {
                tcgdbPokemonPrintingTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbPokemonPrinting == null) {
            return null;
        }   

        let tcgdbPokemonPrintingDTO: TCGdbPokemonPrintingDTO = ({ ...tcgdbPokemonPrinting });

        return tcgdbPokemonPrintingDTO;
    }

    async createTCGdbPokemonPrintings() {
        
        let tcgdbPokemonPrintingRecordCount = 0;

        let tcgPlayerPokemonPrintings = await this.tcgPlayerPokemonPrintingService.getTCGPlayerPokemonPrintings();

        for(let i=0; i < tcgPlayerPokemonPrintings.length; i++) {
            let tcgPlayerPokemonPrinting = tcgPlayerPokemonPrintings[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbPokemonPrinting = await this.getTCGdbPokemonPrintingByTCGPlayerId(tcgPlayerPokemonPrinting.tcgPlayerPokemonPrintingId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbPokemonPrinting == null) {
                const newTCGdgPokemonPrinting = this.tcgdbPokemonPrintingRepository.create({
                    tcgdbPokemonPrintingTCGPlayerId: tcgPlayerPokemonPrinting.tcgPlayerPokemonPrintingId,
                    tcgdbPokemonPrintingName: tcgPlayerPokemonPrinting.tcgPlayerPokemonPrintingName,
                    tcgdbPokemonPrintingDisplayOrder: tcgPlayerPokemonPrinting.tcgPlayerPokemonPrintingDisplayOrder
                });

                await this.tcgdbPokemonPrintingRepository.save(newTCGdgPokemonPrinting);

                tcgdbPokemonPrintingRecordCount++;
            }
        }

        return tcgdbPokemonPrintingRecordCount;

    }
}


