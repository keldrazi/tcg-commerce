import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImportSortTypeDTO, UpdateImportSortTypeDTO, ImportSortTypeDTO } from './dto/import.sort.type.dto';
import { ImportSortType } from 'src/typeorm/entities/tcgcommerce/modules/import/sort/type/import.sort.type.entity';

@Injectable()
export class ImportSortTypeService {

    constructor(
        @InjectRepository(ImportSortType) private importSortTypeRepository: Repository<ImportSortType>,
    ) { }

    async getImportSortType(importSortTypeId: string) {
        let importSortType = await this.importSortTypeRepository.findOne({ 
            where: { 
                importSortTypeId: importSortTypeId 
            } 
        });
        
        if (importSortType == null) {
            return null;
        }

        let importSortTypeDTO = new ImportSortTypeDTO();
        importSortTypeDTO.importSortTypeId = importSortType.importSortTypeId;
        importSortTypeDTO.importSortTypeName = importSortType.importSortTypeName;
        importSortTypeDTO.importSortTypeDescription = importSortType.importSortTypeDescription;
        importSortTypeDTO.importSortTypeMetadata = importSortType.importSortTypeMetadata;
        importSortTypeDTO.importSortTypeIsActive = importSortType.importSortTypeIsActive;
        importSortTypeDTO.importSortTypeCreateDate = importSortType.importSortTypeCreateDate;
        importSortTypeDTO.importSortTypeUpdateDate = importSortType.importSortTypeUpdateDate;

        return importSortTypeDTO;
        
    }

    async getImportSortTypes() {
        let importSortTypes = await this.importSortTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(importSortTypes == null) {
            return null;
        }
        
        let importSortTypeDTOs: ImportSortTypeDTO[] = [];

        for(let i = 0; i < importSortTypes.length; i++) {
            let importSortType = importSortTypes[i];
            let importSortTypeDTO = new ImportSortTypeDTO();
            importSortTypeDTO.importSortTypeId = importSortType.importSortTypeId
            importSortTypeDTO.importSortTypeName = importSortType.importSortTypeName;
            importSortTypeDTO.importSortTypeDescription = importSortType.importSortTypeDescription;
            importSortTypeDTO.importSortTypeMetadata = importSortType.importSortTypeMetadata;
            importSortTypeDTO.importSortTypeIsActive = importSortType.importSortTypeIsActive;
            importSortTypeDTO.importSortTypeCreateDate = importSortType.importSortTypeCreateDate;
            importSortTypeDTO.importSortTypeUpdateDate = importSortType.importSortTypeUpdateDate;
           

            importSortTypeDTOs.push(importSortTypeDTO);
        }

        return importSortTypeDTOs;
    }
    
    async getImportSortTypeByName(name: string) {
        let importSortType = await this.importSortTypeRepository.findOne({ 
            where: { 
                importSortTypeName: name 
            } 
        });
        
        if (importSortType == null) {
            return null;
        }

        let importSortTypeDTO = new ImportSortTypeDTO();
        importSortTypeDTO.importSortTypeId = importSortType.importSortTypeId;
        importSortTypeDTO.importSortTypeName = importSortType.importSortTypeName;
        importSortTypeDTO.importSortTypeDescription = importSortType.importSortTypeDescription;
        importSortTypeDTO.importSortTypeMetadata = importSortType.importSortTypeMetadata;
        importSortTypeDTO.importSortTypeIsActive = importSortType.importSortTypeIsActive;
        importSortTypeDTO.importSortTypeCreateDate = importSortType.importSortTypeCreateDate;
        importSortTypeDTO.importSortTypeUpdateDate = importSortType.importSortTypeUpdateDate;


        return importSortTypeDTO;
        
    }
    
    async createImportSortType(createImportSortTypeDTO: CreateImportSortTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let importSortType = await this.getImportSortTypeByName(createImportSortTypeDTO.importSortTypeName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (importSortType != null) {
            return null;
        }
        
        let newImportSortType = this.importSortTypeRepository.create({ ...createImportSortTypeDTO });
        newImportSortType = await this.importSortTypeRepository.save(newImportSortType);

        let importSortTypeDTO = this.getImportSortType(newImportSortType.importSortTypeId);
        
        return importSortTypeDTO;
        
    }

    async updateImportSortType(updateImportSortTypeDTO: UpdateImportSortTypeDTO) {
                    
        let existingImportSortType = await this.importSortTypeRepository.findOne({ 
            where: { 
                importSortTypeId: updateImportSortTypeDTO.importSortTypeId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingImportSortType) {
            return null; 
        }

        existingImportSortType.importSortTypeName = updateImportSortTypeDTO.importSortTypeName;
        existingImportSortType.importSortTypeDescription = updateImportSortTypeDTO.importSortTypeDescription;
        existingImportSortType.importSortTypeMetadata = updateImportSortTypeDTO.importSortTypeMetadata
        existingImportSortType.importSortTypeIsActive = updateImportSortTypeDTO.importSortTypeIsActive;
        existingImportSortType.importSortTypeUpdateDate = new Date();
        
        await this.importSortTypeRepository.save(existingImportSortType);

        let importSortTypeDTO = this.getImportSortType(existingImportSortType.importSortTypeId);

        return importSortTypeDTO;
    
    }
    
}