import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryProductCardServiceImportJobTypeDTO, UpdateInventoryProductCardServiceImportJobTypeDTO, InventoryProductCardServiceImportJobTypeDTO } from './dto/inventory.product.card.service.import.job.type.dto';
import { InventoryProductCardServiceImportJobType } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/type/inventory.product.card.service.import.job.type.entity';

@Injectable()
export class InventoryProductCardServiceImportJobTypeService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJobType) private inventoryProductCardServiceImportJobTypeRepository: Repository<InventoryProductCardServiceImportJobType>,
    ) { }

    async getInventoryProductCardServiceImportJobTypeById(inventoryProductCardServiceImportJobTypeId: string) {
        let inventoryProductCardServiceImportJobType = await this.inventoryProductCardServiceImportJobTypeRepository.findOne({ 
            where: { 
                inventoryProductCardServiceImportJobTypeId: inventoryProductCardServiceImportJobTypeId 
            } 
        });
        
        if (inventoryProductCardServiceImportJobType == null) {
            return null;
        }

        let inventoryProductCardServiceImportJobTypeDTO = new InventoryProductCardServiceImportJobTypeDTO();
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeId = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeId;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeName = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeName;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeCode = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeCode;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeDescription = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeDescription;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeFileExtension = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeFileExtension;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeIsActive = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeIsActive;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeCreateDate = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeCreateDate;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeUpdateDate = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeUpdateDate;

        return inventoryProductCardServiceImportJobTypeDTO; 

    }

    async getInventoryProductCardServiceImportJobTypes() {
        let inventoryProductCardServiceImportJobTypes = await this.inventoryProductCardServiceImportJobTypeRepository.find();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCardServiceImportJobTypes == null) {
            return null;
        }

        let inventoryProductCardServiceImportJobTypeDTOs: InventoryProductCardServiceImportJobTypeDTO[] = [];

        for(let i = 0; i < inventoryProductCardServiceImportJobTypes.length; i++) {
            let inventoryProductCardServiceImportJobType = inventoryProductCardServiceImportJobTypes[i];
            let inventoryProductCardServiceImportJobTypeDTO = new InventoryProductCardServiceImportJobTypeDTO();
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeId = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeId;
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeName = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeName;
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeCode = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeCode;
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeDescription = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeDescription;
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeFileExtension = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeFileExtension;
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeIsActive = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeIsActive;
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeCreateDate = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeCreateDate;
            inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeUpdateDate = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeUpdateDate;

            inventoryProductCardServiceImportJobTypeDTOs.push(inventoryProductCardServiceImportJobTypeDTO);
        }

        return inventoryProductCardServiceImportJobTypeDTOs;
    }

    async getInventoryProductCardServiceImportJobTypeByName(name: string) {
        let inventoryProductCardServiceImportJobType = await this.inventoryProductCardServiceImportJobTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobTypeName: name
            }
        });

        if (inventoryProductCardServiceImportJobType == null) {
            return null;
        }

        let inventoryProductCardServiceImportJobTypeDTO = new InventoryProductCardServiceImportJobTypeDTO();
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeId = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeId;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeName = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeName;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeCode = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeCode;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeDescription = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeDescription;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeFileExtension = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeFileExtension;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeIsActive = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeIsActive;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeCreateDate = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeCreateDate;
        inventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeUpdateDate = inventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeUpdateDate;


        return inventoryProductCardServiceImportJobTypeDTO;
        
    }

    async createInventoryProductCardServiceImportJobType(createInventoryProductCardServiceImportJobTypeDTO: CreateInventoryProductCardServiceImportJobTypeDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let inventoryProductCardServiceImportJobType = await this.getInventoryProductCardServiceImportJobTypeByName(createInventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeName);

        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (inventoryProductCardServiceImportJobType != null) {
            return null;
        }

        let newInventoryProductCardServiceImportJobType = this.inventoryProductCardServiceImportJobTypeRepository.create({ ...createInventoryProductCardServiceImportJobTypeDTO });
        newInventoryProductCardServiceImportJobType = await this.inventoryProductCardServiceImportJobTypeRepository.save(newInventoryProductCardServiceImportJobType);

        let inventoryProductCardServiceImportJobTypeDTO = this.getInventoryProductCardServiceImportJobTypeById(newInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeId);

        return inventoryProductCardServiceImportJobTypeDTO;

    }

    async updateInventoryProductCardServiceImportJobType(updateInventoryProductCardServiceImportJobTypeDTO: UpdateInventoryProductCardServiceImportJobTypeDTO) {

        let updateInventoryProductCardServiceImportJobType = await this.inventoryProductCardServiceImportJobTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobTypeId: updateInventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeId
            }
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!updateInventoryProductCardServiceImportJobType) {
            return null; 
        }

        updateInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeName = updateInventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeName;
        updateInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeCode = updateInventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeCode;
        updateInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeDescription = updateInventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeDescription;
        updateInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeFileExtension = updateInventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeFileExtension;
        updateInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeIsActive = updateInventoryProductCardServiceImportJobTypeDTO.inventoryProductCardServiceImportJobTypeIsActive;
        updateInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeUpdateDate = new Date();

        await this.inventoryProductCardServiceImportJobTypeRepository.save(updateInventoryProductCardServiceImportJobType);

        let inventoryProductCardServiceImportJobTypeDTO = this.getInventoryProductCardServiceImportJobTypeById(updateInventoryProductCardServiceImportJobType.inventoryProductCardServiceImportJobTypeId);

        return inventoryProductCardServiceImportJobTypeDTO;

    }
    
}