import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGPrintingService } from 'src/tcgdb/modules/tcgplayer/mtg/printing/tcgplayer.mtg.printing.service';
import { TCGdbMTGPrintingDTO } from './dto/tcgdb.mtg.printing.dto';
import { TCGdbMTGPrinting } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/printing/tcgdb.mtg.printing.entity';

@Injectable()
export class TCGdbMTGPrintingService {

    constructor(
        @InjectRepository(TCGdbMTGPrinting) private tcgdbMTGPrintingRepository: Repository<TCGdbMTGPrinting>, 
        private tcgPlayerMTGPrintingService: TCGPlayerMTGPrintingService,
    ) {}
    
    async getTCGdbMTGPrintings() {
        
        let tcgdbMTGPrintingDTOs: TCGdbMTGPrintingDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbMTGPrintings = await this.tcgdbMTGPrintingRepository.find();

        for(let i=0; i < tcgdbMTGPrintings.length; i++) {
            const tcgdbMTGPrinting = tcgdbMTGPrintings[i];
            
            let tcgdbMTGPrintingDTO: TCGdbMTGPrintingDTO = ({ ...tcgdbMTGPrinting });

            tcgdbMTGPrintingDTOs.push(tcgdbMTGPrintingDTO);
        }

        return tcgdbMTGPrintingDTOs;
    }

    async getTCGdbMTGPrintingByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbMTGPrinting = await this.tcgdbMTGPrintingRepository.findOne({
            where: {
                tcgdbMTGPrintingTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbMTGPrinting == null) {
            return null;
        }   

        let tcgdbMTGPrintingDTO: TCGdbMTGPrintingDTO = ({ ...tcgdbMTGPrinting });

        return tcgdbMTGPrintingDTO;
    }

    async createTCGdbMTGPrintings() {
        
        let tcgdbMTGPrintingRecordCount = 0;

        let tcgPlayerMTGPrintings = await this.tcgPlayerMTGPrintingService.getTCGPlayerMTGPrintings();

        for(let i=0; i < tcgPlayerMTGPrintings.length; i++) {
            let tcgPlayerMTGPrinting = tcgPlayerMTGPrintings[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGPrinting = await this.getTCGdbMTGPrintingByTCGPlayerId(tcgPlayerMTGPrinting.tcgPlayerMTGPrintingId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGPrinting == null) {
                const newTCGdgMTGPrinting = this.tcgdbMTGPrintingRepository.create({
                    tcgdbMTGPrintingTCGPlayerId: tcgPlayerMTGPrinting.tcgPlayerMTGPrintingId,
                    tcgdbMTGPrintingName: tcgPlayerMTGPrinting.tcgPlayerMTGPrintingName,
                    tcgdbMTGPrintingDisplayOrder: tcgPlayerMTGPrinting.tcgPlayerMTGPrintingDisplayOrder
                });

                await this.tcgdbMTGPrintingRepository.save(newTCGdgMTGPrinting);

                tcgdbMTGPrintingRecordCount++;
            }
        }

        return tcgdbMTGPrintingRecordCount;

    }
}


