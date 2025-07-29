import { Injectable } from '@nestjs/common';
import { ImportServicePhyzbatchService } from 'src/tcgcommerce/modules/import/service/card/phyzbatch/import.service.phyzbatch.service';
import { ImportServiceRocaService } from 'src/tcgcommerce/modules/import/service/card/roca/import.service.roca.service';
import { ImportServiceTCGPlayerService } from 'src/tcgcommerce/modules/import/service/card/tcgplayer/import.service.tcgplayer.service';
import { ImportJobDTO } from 'src/tcgcommerce/modules/import/job/card/dto/import.job.dto';
import { ImportSortDTO, ImportSortCardDTO } from 'src/tcgcommerce/modules/import/sort/data/dto/import.sort.data.dto'; 
import { IMPORT_JOB_STATUS, IMPORT_SORT_TYPE_NAME, IMPORT_JOB_UPLOAD_FILE_BUCKET_PATH, IMPORT_PRODUCT_LINE } from 'src/system/constants/tcgcommerce/import/constants.tcgcommerce.import';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImportCardDTO } from 'src/tcgcommerce/modules/import/product/card/dto/import.card.dto';
import { ImportCardService } from 'src/tcgcommerce/modules/import/product/card/import.card.service';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.service';
import { TCGdbMTGCard } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.entity';
import { TCGdbMTGCardDTO } from 'src/tcgdb/modules/tcgdb/mtg/card/dto/tcgdb.mtg.card.dto';

@Injectable()
export class ImportProcessService {

    constructor(
        private importServicePhyzbatchService: ImportServicePhyzbatchService,
        private importServiceRocaService: ImportServiceRocaService,
        private importServiceTCGPlayerService: ImportServiceTCGPlayerService,
        private eventEmitter: EventEmitter2,
        private importCardService: ImportCardService,
        private tcgdbMTGCardService: TCGdbMTGCardService
    ) { }

    

    async processImport(importJobDTO: ImportJobDTO, importJobFile: Express.Multer.File) {

        //UPDATE THE IMPORT JOB STATUS TO PROCESSING FILE;
        this.eventEmitter.emit(
            'import.job.status',
            {
                importJobId: importJobDTO.importJobId,
                importJobStatus: IMPORT_JOB_STATUS.PROCESSING_FILE,
            }
        )
        
        //PROCESS THE IMPORT BASED ON THE SORT TYPE NAME
        let importSortDTO: ImportSortDTO | undefined = undefined;

        switch (importJobDTO.importSortTypeName) {
            case IMPORT_SORT_TYPE_NAME.PHYZBATCH:
                importSortDTO = await this.importServicePhyzbatchService.processImport(importJobFile);
            case IMPORT_SORT_TYPE_NAME.ROCA:
                importSortDTO = await this.importServiceRocaService.processImport(importJobFile);
            case IMPORT_SORT_TYPE_NAME.TCG_PLAYER:
                //importSortDTO = await this.importServiceTCGPlayerService.processImport(importJobFile);
        }

        if(importSortDTO == undefined) {
            //UPDATE THE IMPORT JOB STATUS TO FAILED;
            this.eventEmitter.emit(
                'import.job.update.status',
                {
                    importJobId: importJobDTO.importJobId,
                    importJobStatus: IMPORT_JOB_STATUS.FAILED,
                }
            )
            return;
        }

        //UPDATE THE IMPORT JOB WITH THE IMPORT SORT DATA;
        this.eventEmitter.emit(
            'import.job.update.sort.data',
            {
                importJobId: importJobDTO.importJobId,
                importSortDTO: importSortDTO,
            }
        );

        //CREATE THE IMPORT CARD DATA;
        let importSortCardDTOs = importSortDTO.importSortCards;

        switch (importJobDTO.productLineAbbreviation) {
            case IMPORT_PRODUCT_LINE.MTG:
                await this.createMTGImportCards(importJobDTO.importJobId, importSortCardDTOs);
                break;
            case IMPORT_PRODUCT_LINE.PKE:
                // Handle PKE import cards creation if needed
                break;

        }
        
    }

    async createMTGImportCards(importJobId: string, importSortCardDTOs: ImportSortCardDTO[]) {
        
        for(let i = 0; i < importSortCardDTOs.length; i++) {
            let importSortCardDTO = importSortCardDTOs[i];

            //CHECK TO SEE IF THE CARD EXISTS IN THE TCGDB;
            let tcgdbMTGCard: TCGdbMTGCardDTO | null = await this.tcgdbMTGCardService.getTCGdbMTGCardByTCGPlayerId(importSortCardDTO.importSortCardTCGPlayerId);

            if(tcgdbMTGCard == null) {
                //TO DO: HANDLE ERROR FOR CARD NOT FOUND IN TCGDB;
                continue;
            }

            let importCardDTO: CreateImportCardDTO = {
                importJobId: importJobId,
                importCardTCGDBId: tcgdbMTGCard.tcgdbMTGCardId,
                importCardName: tcgdbMTGCard.tcgdbMTGCardName,
                importCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
                importCardSetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
                importCardCondition: importSortCardDTO.importSortCardCondition,
                importCardPrinting: importSortCardDTO.importSortCardPrinting,
                importCardQty: importSortCardDTO.importSortCardQty,
                importCardPrice: importSortCardDTO.importSortCardTCGPlayerLowPrice,
            };
            
            //CREATE THE IMPORT CARD;
            await this.importCardService.createImportCard(importCardDTO);
        }

        this.eventEmitter.emit(
            'import.job.update.status',
            {
                importJobId: importJobId,
                importJobStatus: IMPORT_JOB_STATUS.READY_FOR_REVIEW
            }
        )
            
        return;
    }
    
}