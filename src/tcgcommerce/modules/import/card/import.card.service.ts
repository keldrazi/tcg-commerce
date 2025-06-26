import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportCard } from 'src/typeorm/entities/tcgcommerce/modules/import/card/import.card.entity';
import { ImportCardDTO, CreateImportCardDTO, UpdateImportCardDTO } from './dto/import.card.dto';

@Injectable()
export class ImportCardService {

    constructor(
        @InjectRepository(ImportCard) private importCardRepository: Repository<ImportCard>,
    ) { }

    async getImportCardsByImportJobId(importJobId: string) {

        let importCards = await this.importCardRepository.find({
            where: {
                importJobId: importJobId
            }
        });

        if(importCards == null) {
            return [];
        }

        let importCardDTOs: ImportCardDTO[] = [];

        for(let i = 0; i < importCards.length; i++) {
            let importCard = importCards[i];
            let importCardDTO = new ImportCardDTO();
            importCardDTO.importCardId = importCard.importCardId;
            importCardDTO.importJobId = importCard.importJobId;
            importCardDTO.importCardTCGdbId = importCard.importCardTCGdbId;
            importCardDTO.importCardSetName = importCard.importCardSetName;
            importCardDTO.importCardName = importCard.importCardName;
            importCardDTO.importCardCondition = importCard.importCardCondition;
            importCardDTO.importCardPrinting = importCard.importCardPrinting;
            importCardDTO.importCardQty = importCard.importCardQty;
            importCardDTO.importCardPrice = importCard.importCardPrice;
            importCardDTO.importCardCreateDate = importCard.importCardCreateDate;
            importCardDTO.importCardUpdateDate = importCard.importCardUpdateDate;

            importCardDTOs.push(importCardDTO);
        }

        return importCardDTOs;
    }

    async getImportCardByImportCardId(importCardId: string) {
        let importCard = await this.importCardRepository.findOne({
            where: {
                importCardId: importCardId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(importCard == null) {
            return null;
        }

        let importCardDTO = new ImportCardDTO();
        importCardDTO.importCardId = importCard.importCardId;
        importCardDTO.importJobId = importCard.importJobId;
        importCardDTO.importCardTCGdbId = importCard.importCardTCGdbId;
        importCardDTO.importCardSetName = importCard.importCardSetName;
        importCardDTO.importCardName = importCard.importCardName;
        importCardDTO.importCardCondition = importCard.importCardCondition;
        importCardDTO.importCardPrinting = importCard.importCardPrinting;
        importCardDTO.importCardQty = importCard.importCardQty;
        importCardDTO.importCardPrice = importCard.importCardPrice;
        importCardDTO.importCardCreateDate = importCard.importCardCreateDate;
        importCardDTO.importCardUpdateDate = importCard.importCardUpdateDate;

        return importCardDTO;
            
    }

    async getImportCardByImportJobIdAndTCGdbId(importJobId: string, tcgdbId: string) {
        let importCard = await this.importCardRepository.findOne({
            where: {
                importJobId: importJobId,
                importCardTCGdbId: tcgdbId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(importCard == null) {
            return null;
        }

        let importCardDTO = new ImportCardDTO();
        importCardDTO.importCardId = importCard.importCardId;
        importCardDTO.importJobId = importCard.importJobId;
        importCardDTO.importCardTCGdbId = importCard.importCardTCGdbId;
        importCardDTO.importCardSetName = importCard.importCardSetName;
        importCardDTO.importCardName = importCard.importCardName;
        importCardDTO.importCardCondition = importCard.importCardCondition;
        importCardDTO.importCardPrinting = importCard.importCardPrinting;
        importCardDTO.importCardQty = importCard.importCardQty;
        importCardDTO.importCardPrice = importCard.importCardPrice;
        importCardDTO.importCardCreateDate = importCard.importCardCreateDate;
        importCardDTO.importCardUpdateDate = importCard.importCardUpdateDate;

        return importCardDTO;
            
    }

    async createImportCard(createImportCardDTO: CreateImportCardDTO) {
        
        //CHECK TO SEE IF THE IMPORT JOB EXISTS;
        let importCard = await this.getImportCardByImportJobIdAndTCGdbId(createImportCardDTO.importJobId, createImportCardDTO.importCardTCGDBId);
                
        //TO DO: RETURN AN ERROR FOR DUPLICATE IMPORT CARD;
        if (importCard != null) {
            return null;
        }
        
        let newImportCard = this.importCardRepository.create({ ...createImportCardDTO });
        newImportCard = await this.importCardRepository.save(newImportCard);

        let importCardDTO = new ImportCardDTO();
        importCardDTO.importCardId = newImportCard.importCardId;
        importCardDTO.importJobId = newImportCard.importJobId;
        importCardDTO.importCardTCGdbId = newImportCard.importCardTCGdbId;
        importCardDTO.importCardSetName = newImportCard.importCardSetName;
        importCardDTO.importCardCondition = newImportCard.importCardCondition;
        importCardDTO.importCardPrinting = newImportCard.importCardPrinting;
        importCardDTO.importCardQty = newImportCard.importCardQty;
        importCardDTO.importCardPrice = newImportCard.importCardPrice;
        importCardDTO.importCardCreateDate = newImportCard.importCardCreateDate;
        importCardDTO.importCardUpdateDate = newImportCard.importCardUpdateDate;

        return importCardDTO;
        
    }

    async updateImportCard(updateImportCardDTO: UpdateImportCardDTO) {

        //CHECK TO SEE IF THE IMPORT JOB EXISTS;
        let importCard = await this.importCardRepository.findOne({
            where: {
                importCardId: updateImportCardDTO.importCardId
            }
        });

        //TO DO: RETURN AN ERROR FOR NON EXISTENT IMPORT CARD;
        if(importCard == null) {
            return null;
        }

        importCard.importCardName = updateImportCardDTO.importCardName;
        importCard.importCardSetName = updateImportCardDTO.importCardSetName;
        importCard.importCardCondition = updateImportCardDTO.importCardCondition;
        importCard.importCardQty = updateImportCardDTO.importCardQty;
        importCard.importCardPrice = updateImportCardDTO.importCardPrice;

        importCard = await this.importCardRepository.save(importCard);

        let importCardDTO = this.getImportCardByImportCardId(importCard.importCardId);

        return importCardDTO;
    }
    
}