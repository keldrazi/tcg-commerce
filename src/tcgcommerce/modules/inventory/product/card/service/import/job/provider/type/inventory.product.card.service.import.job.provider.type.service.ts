import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryProductCardServiceImportJobProviderTypeDTO, UpdateInventoryProductCardServiceImportJobProviderTypeDTO, InventoryProductCardServiceImportJobProviderTypeDTO } from './dto/inventory.product.card.service.import.job.provider.type.dto';
import { InventoryProductCardServiceImportJobProviderType } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.entity';

@Injectable()
export class InventoryProductCardServiceImportJobProviderTypeService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJobProviderType) private inventoryProductCardServiceImportJobProviderTypeRepository: Repository<InventoryProductCardServiceImportJobProviderType>,
    ) { }

    async getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderTypeId: string): Promise<InventoryProductCardServiceImportJobProviderTypeDTO> {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({ 
            where: { 
                inventoryProductCardServiceImportJobProviderTypeId: inventoryProductCardServiceImportJobProviderTypeId 
            } 
        });
        
        if (inventoryProductCardServiceImportJobProviderType == null) {
            throw new NotFoundException('Inventory product card service import job provider type not found');
        }

        let inventoryProductCardServiceImportJobProviderTypeDTO = new InventoryProductCardServiceImportJobProviderTypeDTO();
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeName;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCode = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCode;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeDescription = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeDescription;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileExtension = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileExtension;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileUploadPath = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileUploadPath;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileDataKey = JSON.parse(inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileDataKey);
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCreateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCreateDate;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeUpdateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate;

        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async getInventoryProductCardServiceImportJobProviderTypes(): Promise<InventoryProductCardServiceImportJobProviderTypeDTO[]> {
        let inventoryProductCardServiceImportJobProviderTypes = await this.inventoryProductCardServiceImportJobProviderTypeRepository.find();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(inventoryProductCardServiceImportJobProviderTypes == null) {
            return [];
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
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileUploadPath = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileUploadPath;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileDataKey = JSON.parse(inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileDataKey);
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCreateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCreateDate;
            inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeUpdateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate;

            inventoryProductCardServiceImportJobProviderTypeDTOs.push(inventoryProductCardServiceImportJobProviderTypeDTO);
        }

        return inventoryProductCardServiceImportJobProviderTypeDTOs;
    }

    async getInventoryProductCardServiceImportJobProviderTypeByName(inventoryProductCardServiceImportJobProviderTypeName: string): Promise<InventoryProductCardServiceImportJobProviderTypeDTO> {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeName: inventoryProductCardServiceImportJobProviderTypeName
            }
        });

        if (inventoryProductCardServiceImportJobProviderType == null) {
            throw new NotFoundException('Inventory product card service import job provider type not found');
        }

        let inventoryProductCardServiceImportJobProviderTypeDTO = new InventoryProductCardServiceImportJobProviderTypeDTO();
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeName;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCode = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCode;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeDescription = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeDescription;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileExtension = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileExtension;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileUploadPath = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileUploadPath;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileDataKey = JSON.parse(inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileDataKey);
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCreateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCreateDate;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeUpdateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate;


        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async getInventoryProductCardServiceImportJobProviderTypeByCode(inventoryProductCardServiceImportJobProviderTypeCode: string): Promise<InventoryProductCardServiceImportJobProviderTypeDTO | null> {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeCode: inventoryProductCardServiceImportJobProviderTypeCode
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
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileUploadPath = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileUploadPath;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileDataKey = JSON.parse(inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileDataKey);
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCreateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCreateDate;
        inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeUpdateDate = inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate;


        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async createInventoryProductCardServiceImportJobProviderType(createInventoryProductCardServiceImportJobProviderTypeDTO: CreateInventoryProductCardServiceImportJobProviderTypeDTO): Promise<InventoryProductCardServiceImportJobProviderTypeDTO> {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeName: createInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName
            }
        });

        if (inventoryProductCardServiceImportJobProviderType != null) {
            throw new ConflictException('Inventory product card service import job provider type already exists');
        }

        inventoryProductCardServiceImportJobProviderType = this.inventoryProductCardServiceImportJobProviderTypeRepository.create({ ...createInventoryProductCardServiceImportJobProviderTypeDTO });
        inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.save(inventoryProductCardServiceImportJobProviderType);

        let inventoryProductCardServiceImportJobProviderTypeDTO = this.getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId);

        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async updateInventoryProductCardServiceImportJobProviderType(updateInventoryProductCardServiceImportJobProviderTypeDTO: UpdateInventoryProductCardServiceImportJobProviderTypeDTO): Promise<InventoryProductCardServiceImportJobProviderTypeDTO> {

        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeId: updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId
            }
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!inventoryProductCardServiceImportJobProviderType) {
            throw new NotFoundException('Inventory product card service import job provider type not found');
        }

        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeName = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName;
        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeCode = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeCode;
        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeDescription = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeDescription;
        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileExtension = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileExtension;
        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileUploadPath = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileUploadPath;
        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeFileDataKey = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileDataKey;
        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeIsActive = updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeIsActive;
        inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeUpdateDate = new Date();

        await this.inventoryProductCardServiceImportJobProviderTypeRepository.save(inventoryProductCardServiceImportJobProviderType);

        let inventoryProductCardServiceImportJobProviderTypeDTO = this.getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId);

        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }
    
}