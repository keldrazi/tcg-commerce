import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerPokemonPrinting } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/printing/tcgplayer.pokemon.printing.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIPrintingService } from 'src/tcgdb/modules/tcgplayer/api/printing/tcgplayer.api.printing.service';

@Injectable()
export class TCGPlayerPokemonPrintingService {

    constructor(
        @InjectRepository(TCGPlayerPokemonPrinting) private tcgPlayerPokemonPrintingRepository: Repository<TCGPlayerPokemonPrinting>, 
        private tcgPlayerAPIPrintingService: TCGPlayerAPIPrintingService,
    ) {}

    private tcgPlayerPokemonCategoryId = '3';


    async getTCGPlayerPokemonPrintings() {
        return await this.tcgPlayerPokemonPrintingRepository.find();
    }

    async getTCGPlayerPokemonPrintingByPrintingName(printingName: string) {
        let tcgPlayerPrinting = await this.tcgPlayerPokemonPrintingRepository.findOne({
            where: {
                tcgPlayerPokemonPrintingName: printingName,
            }
        });

        return tcgPlayerPrinting;
    }

    async createTCGPlayerPokemonPrintings() {

        let tcgPlayerPokemonPrintingRecordCount = 0;
        let tcgPlayerPokemonPrintings = await this.tcgPlayerAPIPrintingService.getTCGPlayerAPIPrintingsByCategoryId(this.tcgPlayerPokemonCategoryId);
        
        for(let i = 0; i < tcgPlayerPokemonPrintings.length; i++) {
            const tcgPlayerPokemonPrinting: any = tcgPlayerPokemonPrintings[i];
            
            //CHECK TO SEE IF THE PRINTING EXISTS;
            const tcgPlayerPokemonPrintingCheck = await this.getTCGPlayerPokemonPrintingByPrintingName(tcgPlayerPokemonPrinting.name);

            //SET DOESN'T EXIST - CREATE PRINTING;
            if(tcgPlayerPokemonPrintingCheck == null) {
            
                const newTCGPlayerPokemonPrinting = this.tcgPlayerPokemonPrintingRepository.create({
                    tcgPlayerPokemonPrintingId: tcgPlayerPokemonPrinting.printingId,
                    tcgPlayerPokemonPrintingName: tcgPlayerPokemonPrinting.name,
                    tcgPlayerPokemonPrintingDisplayOrder: tcgPlayerPokemonPrinting.displayOrder,
                    tcgPlayerPokemonPrintingModifiedOn: tcgPlayerPokemonPrinting.modifiedOn
                });

                await this.tcgPlayerPokemonPrintingRepository.save(newTCGPlayerPokemonPrinting);

                tcgPlayerPokemonPrintingRecordCount++;
            }
        }
        
        return tcgPlayerPokemonPrintingRecordCount;
    }
}


