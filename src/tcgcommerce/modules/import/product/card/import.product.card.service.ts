import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportProductCard } from 'src/typeorm/entities/tcgcommerce/modules/import/product/card/import.product.card.entity';
import { ImportProductCardDTO, CreateImportProductCardDTO } from './dto/import.product.card.dto';

@Injectable()
export class ImportProductCardService {

    constructor(
        @InjectRepository(ImportProductCard) private importProductCardRepository: Repository<ImportProductCard>,
    ) { }

    async getImportProductCardsByImportJobCardId(importJobCardId: string) {

        let importProductCards = await this.importProductCardRepository.find({
            where: {
                importJobCardId: importJobCardId
            }
        });

        if(importProductCards == null) {
            return [];
        }

        let importProductCardDTOs: ImportProductCardDTO[] = [];

        for(let i = 0; i < importProductCards.length; i++) {
            let importProductCard = importProductCards[i];
            let importProductCardDTO: ImportProductCardDTO = ({ ...importProductCard });

            importProductCardDTOs.push(importProductCardDTO);
        }

        return importProductCardDTOs;
    }

    async getImportProductCardByImportProductCardId(importProductCardId: string) {
        let importProductCard = await this.importProductCardRepository.findOne({
            where: {
                importProductCardId: importProductCardId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(importProductCard == null) {
            return null;
        }

        let importProductCardDTO:ImportProductCardDTO = ({ ...importProductCard });

        return importProductCardDTO;

    }

    async getImportProductCardByImportJobCardIdAndTCGdbId(importJobCardId: string, tcgdbId: string) {
        let importProductCard = await this.importProductCardRepository.findOne({
            where: {
                importJobCardId: importJobCardId,
                importProductCardTCGdbId: tcgdbId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(importProductCard == null) {
            return null;
        }

        let importProductCardDTO:ImportProductCardDTO = ({ ...importProductCard });

        return importProductCardDTO;

    }

    async createImportProductCard(createImportProductCardDTO: CreateImportProductCardDTO) {

        //CHECK TO SEE IF THE IMPORT JOB EXISTS;
        let importProductCard = await this.getImportProductCardByImportJobCardIdAndTCGdbId(createImportProductCardDTO.importJobCardId, createImportProductCardDTO.importProductCardTCGDBId);
                
        //TO DO: RETURN AN ERROR FOR DUPLICATE IMPORT CARD;
        if (importProductCard != null) {
            return null;
        }
        
        importProductCard = this.importProductCardRepository.create({ ...createImportProductCardDTO });
        importProductCard = await this.importProductCardRepository.save(importProductCard);

        let importProductCardDTO: ImportProductCardDTO = ({ ...importProductCard });

        return importProductCardDTO;
        
    }

    /*
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
    */
    
}