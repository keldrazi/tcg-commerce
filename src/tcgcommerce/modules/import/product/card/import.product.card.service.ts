import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportCard } from 'src/typeorm/entities/tcgcommerce/modules/import/product/card/import.product.card.entity';
import { ImportCardDTO, CreateImportCardDTO, UpdateImportCardDTO } from './dto/import.product.card.dto';

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
            let importCardDTO:ImportCardDTO = ({ ...importCard });

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

        let importCardDTO:ImportCardDTO = ({ ...importCard });

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

        let importCardDTO:ImportCardDTO = ({ ...importCard });

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

        let importCardDTO = this.getImportCardByImportCardId(newImportCard.importCardId);

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