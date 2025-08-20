import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImportSortCardTypeDTO, UpdateImportSortCardTypeDTO, ImportSortCardTypeDTO } from './dto/import.sort.card.type.dto';
import { ImportSortCardType } from 'src/typeorm/entities/tcgcommerce/modules/import/sort/card/type/import.sort.card.type.entity';

@Injectable()
export class ImportSortCardTypeService {

    constructor(
        @InjectRepository(ImportSortCardType) private importSortCardTypeRepository: Repository<ImportSortCardType>,
    ) { }

    async getImportSortCardType(importSortCardTypeId: string) {
        let importSortCardType = await this.importSortCardTypeRepository.findOne({ 
            where: { 
                importSortCardTypeId: importSortCardTypeId 
            } 
        });
        
        if (importSortCardType == null) {
            return null;
        }

        let importSortCardTypeDTO = new ImportSortCardTypeDTO();
        importSortCardTypeDTO.importSortCardTypeId = importSortCardType.importSortCardTypeId;
        importSortCardTypeDTO.importSortCardTypeName = importSortCardType.importSortCardTypeName;
        importSortCardTypeDTO.importSortCardTypeDescription = importSortCardType.importSortCardTypeDescription;
        importSortCardTypeDTO.importSortCardTypeMetadata = importSortCardType.importSortCardTypeMetadata;
        importSortCardTypeDTO.importSortCardTypeIsActive = importSortCardType.importSortCardTypeIsActive;
        importSortCardTypeDTO.importSortCardTypeCreateDate = importSortCardType.importSortCardTypeCreateDate;
        importSortCardTypeDTO.importSortCardTypeUpdateDate = importSortCardType.importSortCardTypeUpdateDate;

        return importSortCardTypeDTO;
        
    }

    async getImportSortCardTypes() {
        let importSortCardTypes = await this.importSortCardTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(importSortCardTypes == null) {
            return null;
        }
        
        let importSortCardTypeDTOs: ImportSortCardTypeDTO[] = [];

        for(let i = 0; i < importSortCardTypes.length; i++) {
            let importSortCardType = importSortCardTypes[i];
            let importSortCardTypeDTO = new ImportSortCardTypeDTO();
            importSortCardTypeDTO.importSortCardTypeId = importSortCardType.importSortCardTypeId
            importSortCardTypeDTO.importSortCardTypeName = importSortCardType.importSortCardTypeName;
            importSortCardTypeDTO.importSortCardTypeDescription = importSortCardType.importSortCardTypeDescription;
            importSortCardTypeDTO.importSortCardTypeMetadata = importSortCardType.importSortCardTypeMetadata;
            importSortCardTypeDTO.importSortCardTypeIsActive = importSortCardType.importSortCardTypeIsActive;
            importSortCardTypeDTO.importSortCardTypeCreateDate = importSortCardType.importSortCardTypeCreateDate;
            importSortCardTypeDTO.importSortCardTypeUpdateDate = importSortCardType.importSortCardTypeUpdateDate;
           

            importSortCardTypeDTOs.push(importSortCardTypeDTO);
        }

        return importSortCardTypeDTOs;
    }
    
    async getImportSortCardTypeByName(name: string) {
        let importSortCardType = await this.importSortCardTypeRepository.findOne({ 
            where: { 
                importSortCardTypeName: name 
            } 
        });
        
        if (importSortCardType == null) {
            return null;
        }

        let importSortCardTypeDTO = new ImportSortCardTypeDTO();
        importSortCardTypeDTO.importSortCardTypeId = importSortCardType.importSortCardTypeId;
        importSortCardTypeDTO.importSortCardTypeName = importSortCardType.importSortCardTypeName;
        importSortCardTypeDTO.importSortCardTypeDescription = importSortCardType.importSortCardTypeDescription;
        importSortCardTypeDTO.importSortCardTypeMetadata = importSortCardType.importSortCardTypeMetadata;
        importSortCardTypeDTO.importSortCardTypeIsActive = importSortCardType.importSortCardTypeIsActive;
        importSortCardTypeDTO.importSortCardTypeCreateDate = importSortCardType.importSortCardTypeCreateDate;
        importSortCardTypeDTO.importSortCardTypeUpdateDate = importSortCardType.importSortCardTypeUpdateDate;


        return importSortCardTypeDTO;
        
    }
    
    async createImportSortCardType(createImportSortCardTypeDTO: CreateImportSortCardTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let importSortCardType = await this.getImportSortCardTypeByName(createImportSortCardTypeDTO.importSortCardTypeName);

        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (importSortCardType != null) {
            return null;
        }

        let newImportSortCardType = this.importSortCardTypeRepository.create({ ...createImportSortCardTypeDTO });
        newImportSortCardType = await this.importSortCardTypeRepository.save(newImportSortCardType);

        let importSortCardTypeDTO = this.getImportSortCardType(newImportSortCardType.importSortCardTypeId);

        return importSortCardTypeDTO;
        
    }

    async updateImportSortCardType(updateImportSortCardTypeDTO: UpdateImportSortCardTypeDTO) {

        let existingImportSortCardType = await this.importSortCardTypeRepository.findOne({
            where: {
                importSortCardTypeId: updateImportSortCardTypeDTO.importSortCardTypeId
            }
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingImportSortCardType) {
            return null;
        }

        existingImportSortCardType.importSortCardTypeName = updateImportSortCardTypeDTO.importSortCardTypeName;
        existingImportSortCardType.importSortCardTypeDescription = updateImportSortCardTypeDTO.importSortCardTypeDescription;
        existingImportSortCardType.importSortCardTypeMetadata = updateImportSortCardTypeDTO.importSortCardTypeMetadata;
        existingImportSortCardType.importSortCardTypeIsActive = updateImportSortCardTypeDTO.importSortCardTypeIsActive;
        existingImportSortCardType.importSortCardTypeUpdateDate = new Date();

        await this.importSortCardTypeRepository.save(existingImportSortCardType);

        let importSortCardTypeDTO = this.getImportSortCardType(existingImportSortCardType.importSortCardTypeId);

        return importSortCardTypeDTO;
    
    }
    
}