import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryProductCardServiceImportJobProviderTypeDTO, UpdateInventoryProductCardServiceImportJobProviderTypeDTO, InventoryProductCardServiceImportJobProviderTypeDTO } from './dto/inventory.product.card.service.import.job.provider.type.dto';
import { InventoryProductCardServiceImportJobProviderType } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.entity';

@Injectable()
export class InventoryProductCardServiceImportJobProviderTypeService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJobProviderType) private inventoryProductCardServiceImportJobProviderTypeRepository: Repository<InventoryProductCardServiceImportJobProviderType>,
    ) { }

    async getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderTypeId: string) {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({ 
            where: { 
                inventoryProductCardServiceImportJobProviderTypeId: inventoryProductCardServiceImportJobProviderTypeId 
            } 
        });
        
        if (inventoryProductCardServiceImportJobProviderType == null) {
            return null;
        }

        let inventoryProductCardServiceImportJobProviderTypeDTO = new InventoryProductCardServiceImportJobProviderTypeDTO();
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeName;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCode = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCode;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeDescription = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeDescription;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileExtension = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileExtension;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCreateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCreateDate;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeUpdateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate;

        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async getInventoryProductCardServiceImportJobProviderTypes() {
        let inventoryProductCardServiceImportJobProviderTypes = await this.inventoryProductCardServiceImportJobProviderTypeRepository.find();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCardServiceImportJobProviderTypes == null) {
            return null;
        }

        let inventoryProductCardServiceImportJobProviderTypeDTOs: InventoryProductCardServiceImportJobProviderTypeDTO[] = [];

        for(let i = 0; i < inventoryProductCardServiceImportJobProviderTypes.length; i++) {
            let inventoryProductCardServiceImportJobProviderType = inventoryProductCardServiceImportJobProviderTypes[i];
            let inventoryProductCardServiceImportJobProviderTypeDTO = new InventoryProductCardServiceImportJobProviderTypeDTO();
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeName;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCode = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCode;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeDescription = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeDescription;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileExtension = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileExtension;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCreateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCreateDate;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeUpdateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate;

            inventoryProductCardServiceImportJobProviderTypeDTOs.push(inventoryProductCardServiceImportJobProviderTypeDTO);
        }

        return inventoryProductCardServiceImportJobProviderTypeDTOs;
    }

    async getInventoryProductCardServiceImportJobProviderTypeByName(name: string) {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeName: name
            }
        });

        if (inventoryProductCardServiceImportJobProviderType == null) {
            return null;
        }

        let inventoryProductCardServiceImportJobProviderTypeDTO = new InventoryProductCardServiceImportJobProviderTypeDTO();
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeName;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCode = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCode;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeDescription = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeDescription;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileExtension = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileExtension;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCreateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCreateDate;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeUpdateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate;


        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async createInventoryProductCardServiceImportJobProviderType(createInventoryProductCardServiceImportJobProviderTypeDTO: CreateInventoryProductCardServiceImportJobProviderTypeDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let inventoryProductCardServiceImportJobProviderType = await this.getInventoryProductCardServiceImportJobProviderTypeByName(createInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName);

        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (inventoryProductCardServiceImportJobProviderType != null) {
            return null;
        }

        let newInventoryProductCardServiceImportJobProviderType = this.inventoryProductCardServiceImportJobProviderTypeRepository.create({ ...createInventoryProductCardServiceImportJobProviderTypeDTO });
        newInventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.save(newInventoryProductCardServiceImportJobProviderType);

        let inventoryProductCardServiceImportJobProviderTypeDTO = this.getInventoryProductCardServiceImportJobProviderTypeById(newInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId);

        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async updateInventoryProductCardServiceImportJobProviderType(updateInventoryProductCardServiceImportJobProviderTypeDTO: UpdateInventoryProductCardServiceImportJobProviderTypeDTO) {

        let updateInventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeId: updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId
            }
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!updateInventoryProductCardServiceImportJobProviderType) {
            return null; 
        }

        updateInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeName = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName;
        updateInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCode = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCode;
        updateInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeDescription = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeDescription;
        updateInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileExtension = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileExtension;
        updateInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive;
        updateInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate = new Date();

        await this.inventoryProductCardServiceImportJobProviderTypeRepository.save(updateInventoryProductCardServiceImportJobProviderType);

        let inventoryProductCardServiceImportJobProviderTypeDTO = this.getInventoryProductCardServiceImportJobProviderTypeById(updateInventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId);

        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }
    
}