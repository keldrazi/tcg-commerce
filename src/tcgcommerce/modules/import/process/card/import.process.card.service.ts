import { Injectable } from '@nestjs/common';
import { ImportServiceCardPhyzbatchService } from 'src/tcgcommerce/modules/import/service/card/phyzbatch/import.service.card.phyzbatch.service';
import { ImportServiceCardRocaService } from 'src/tcgcommerce/modules/import/service/card/roca/import.service.card.roca.service';
import { ImportServiceCardTCGPlayerService } from 'src/tcgcommerce/modules/import/service/card/tcgplayer/import.service.card.tcgplayer.service';
import { ImportJobCardDTO } from 'src/tcgcommerce/modules/import/job/card/dto/import.job.card.dto';
import { ImportSortCardDataDTO, ImportSortCardDTO } from 'src/tcgcommerce/modules/import/sort/card/data/dto/import.sort.card.data.dto'; 
import { IMPORT_JOB_CARD_STATUS, IMPORT_SORT_CARD_TYPE_NAME, IMPORT_JOB_CARD_UPLOAD_FILE_BUCKET_PATH, IMPORT_JOB_CARD_PRODUCT_LINE } from 'src/system/constants/tcgcommerce/import/job/card/tcgcommerce.import.job.card.constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImportProductCardDTO } from 'src/tcgcommerce/modules/import/product/card/dto/import.product.card.dto';
import { ImportProductCardService } from 'src/tcgcommerce/modules/import/product/card/import.product.card.service';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.service';
import { TCGdbMTGCard } from 'src/typeorm/entities/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.entity';
import { TCGdbMTGCardDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/card/dto/tcgdb.mtg.card.dto';

@Injectable()
export class ImportProcessCardService {

    constructor(
        private importServiceCardPhyzbatchService: ImportServiceCardPhyzbatchService,
        private importServiceCardRocaService: ImportServiceCardRocaService,
        private importServiceCardTCGPlayerService: ImportServiceCardTCGPlayerService,
        private eventEmitter: EventEmitter2,
        private importProductCardService: ImportProductCardService,
        private tcgdbMTGCardService: TCGdbMTGCardService
    ) { }

    
    /*
    async processImportCards(importJobCardDTO: ImportJobCardDTO, importJobCardFile: Express.Multer.File) {

        //UPDATE THE IMPORT JOB STATUS TO PROCESSING FILE;
        this.eventEmitter.emit(
            'import.job.card.update.status',
            {
                importJobId: importJobCardDTO.importJobCardId,
                importJobStatus: IMPORT_JOB_CARD_STATUS.PROCESSING_FILE,
            }
        )
        
        //PROCESS THE IMPORT BASED ON THE SORT TYPE NAME
        let importSortCardDataDTO: ImportSortCardDataDTO | undefined = undefined;

        switch (importJobCardDTO.importSortCardTypeName) {
            case IMPORT_SORT_CARD_TYPE_NAME.PHYZBATCH:
                importSortCardDataDTO = await this.importServiceCardPhyzbatchService.processImportCards(importJobCardFile);
            case IMPORT_SORT_CARD_TYPE_NAME.ROCA:
                importSortCardDataDTO = await this.importServiceCardRocaService.processImportCards(importJobCardFile);
            case IMPORT_SORT_CARD_TYPE_NAME.TCG_PLAYER:
                importSortCardDataDTO = await this.importServiceCardTCGPlayerService.processImportCards(importJobCardFile);
        }

        if(importSortCardDataDTO == undefined) {
            //UPDATE THE IMPORT JOB STATUS TO FAILED;
            this.eventEmitter.emit(
                'import.job.card.update.status',
                {
                    importJobCardId: importJobCardDTO.importJobCardId,
                    importJobCardStatus: IMPORT_JOB_CARD_STATUS.FAILED,
                }
            )
            return;
        }

        //UPDATE THE IMPORT JOB WITH THE IMPORT SORT DATA;
        this.eventEmitter.emit(
            'import.job.card.update.sort.data',
            {
                importJobCardId: importJobCardDTO.importJobCardId,
                importSortCardDataDTO: importSortCardDataDTO,
            }
        );


        switch (importJobCardDTO.productLineCode) {
            case IMPORT_JOB_CARD_PRODUCT_LINE.MTG:
                await this.createMTGImportCards(importJobCardDTO.importJobCardId, importSortCardDataDTO.importSortCardData);
                break;
            case IMPORT_JOB_CARD_PRODUCT_LINE.PKE:
                // Handle PKE import cards creation if needed
                break;

        }
        
    }
    /*
    //NEED TO UPDATE THIS TO PRODUCT NOT TCGDB CARD;
    async createMTGImportCards(importJobCardId: string, importSortCardDTOs: ImportSortCardDTO[]) {
        
        for(let i = 0; i < importSortCardDTOs.length; i++) {
            let importSortCardDTO = importSortCardDTOs[i];

            //CHECK TO SEE IF THE CARD EXISTS IN THE TCGDB;
            let tcgdbMTGCard: TCGdbMTGCardDTO | null = await this.tcgdbMTGCardService.getTCGdbMTGCardByTCGPlayerId(importSortCardDTO.importSortCardTCGPlayerId);

            if(tcgdbMTGCard == null) {
                //TO DO: HANDLE ERROR FOR CARD NOT FOUND IN TCGDB;
                continue;
            }

            let importProductCardDTO: CreateImportProductCardDTO = {
                importJobCardId: importJobCardId,
                importProductCardTCGdbId: tcgdbMTGCard.tcgdbMTGCardId,
                importProductCardName: tcgdbMTGCard.tcgdbMTGCardName,
                importProductCardSetName: tcgdbMTGCard.tcgdbMTGCardSetName,
                importProductCardSetCode: tcgdbMTGCard.tcgdbMTGCardSetCode,
                importProductCardCondition: importSortCardDTO.importSortCardCondition,
                importProductCardPrinting: importSortCardDTO.importSortCardPrinting,
                importProductCardQty: importSortCardDTO.importSortCardQty,
                importProductCardPriceLow: importSortCardDTO.importSortCardTCGPlayerLowPrice,
                importProductCardPriceMarket: importSortCardDTO.importSortCardTCGPlayerMarketPrice,
            };

            
            //CREATE THE IMPORT CARD;
            await this.importProductCardService.createImportProductCard(importProductCardDTO);
        }

        this.eventEmitter.emit(
            'import.job.card.update.status',
            {
                importJobCardId: importJobCardId,
                importJobCardStatus: IMPORT_JOB_CARD_STATUS.READY_FOR_REVIEW
            }
        )
            
        return;
    }
        */
    
}