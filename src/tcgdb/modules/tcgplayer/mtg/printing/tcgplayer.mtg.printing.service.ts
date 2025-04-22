import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerMTGPrinting } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/printing/tcgplayer.mtg.printing.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIPrintingService } from 'src/tcgdb/modules/tcgplayer/api/printing/tcgplayer.api.printing.service';

@Injectable()
export class TCGPlayerMTGPrintingService {

    constructor(
        @InjectRepository(TCGPlayerMTGPrinting) private tcgPlayerMTGPrintingRepository: Repository<TCGPlayerMTGPrinting>, 
        private tcgPlayerAPIPrintingService: TCGPlayerAPIPrintingService,
    ) {}

    private tcgPlayerMTGCategoryId = '1';


    async getTCGPlayerMTGPrintings() {
        return await this.tcgPlayerMTGPrintingRepository.find();
    }

    async getTCGPlayerMTGPrintingByPrintingName(printingName: string) {
        let tcgPlayerPrinting = await this.tcgPlayerMTGPrintingRepository.findOne({
            where: {
                tcgPlayerMTGPrintingName: printingName,
            }
        });

        return tcgPlayerPrinting;
    }

    async createTCGPlayerMTGPrintings() {

        let tcgPlayerMTGPrintingRecordCount = 0;
        let tcgPlayerMTGPrintings = await this.tcgPlayerAPIPrintingService.getTCGPlayerAPIPrintingsByCategoryId(this.tcgPlayerMTGCategoryId);
        
        for(let i = 0; i < tcgPlayerMTGPrintings.length; i++) {
            const tcgPlayerMTGPrinting: any = tcgPlayerMTGPrintings[i];
            
            //CHECK TO SEE IF THE PRINTING EXISTS;
            const tcgPlayerMTGPrintingCheck = await this.getTCGPlayerMTGPrintingByPrintingName(tcgPlayerMTGPrinting.name);

            //SET DOESN'T EXIST - CREATE PRINTING;
            if(tcgPlayerMTGPrintingCheck == null) {
            
                const newTCGPlayerMTGPrinting = this.tcgPlayerMTGPrintingRepository.create({
                    tcgPlayerMTGPrintingId: tcgPlayerMTGPrinting.printingId,
                    tcgPlayerMTGPrintingName: tcgPlayerMTGPrinting.name,
                    tcgPlayerMTGPrintingDisplayOrder: tcgPlayerMTGPrinting.displayOrder,
                    tcgPlayerMTGPrintingModifiedOn: tcgPlayerMTGPrinting.modifiedOn
                });

                await this.tcgPlayerMTGPrintingRepository.save(newTCGPlayerMTGPrinting);

                tcgPlayerMTGPrintingRecordCount++;
            }
        }
        
        return tcgPlayerMTGPrintingRecordCount;
    }
}


