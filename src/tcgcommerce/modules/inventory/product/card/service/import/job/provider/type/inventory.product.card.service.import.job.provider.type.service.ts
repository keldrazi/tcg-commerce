import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryProductCardServiceImportJobProviderTypeDTO, UpdateInventoryProductCardServiceImportJobProviderTypeDTO, InventoryProductCardServiceImportJobProviderTypeDTO } from './dto/inventory.product.card.service.import.job.provider.type.dto';
import { InventoryProductCardServiceImportJobProviderType } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class InventoryProductCardServiceImportJobProviderTypeService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJobProviderType) private inventoryProductCardServiceImportJobProviderTypeRepository: Repository<InventoryProductCardServiceImportJobProviderType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderTypeId: string) {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({ 
            where: { 
                inventoryProductCardServiceImportJobProviderTypeId: inventoryProductCardServiceImportJobProviderTypeId 
            } 
        });
        
        if (inventoryProductCardServiceImportJobProviderType == null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found');
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

    async getInventoryProductCardServiceImportJobProviderTypes() {
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

    async getInventoryProductCardServiceImportJobProviderTypeByName(inventoryProductCardServiceImportJobProviderTypeName: string) {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeName: inventoryProductCardServiceImportJobProviderTypeName
            }
        });

        if (inventoryProductCardServiceImportJobProviderType == null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found');
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

    async getInventoryProductCardServiceImportJobProviderTypeByCode(inventoryProductCardServiceImportJobProviderTypeCode: string) {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeCode: inventoryProductCardServiceImportJobProviderTypeCode
            }
        });

        if (inventoryProductCardServiceImportJobProviderType == null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found');
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

    async createInventoryProductCardServiceImportJobProviderType(createInventoryProductCardServiceImportJobProviderTypeDTO: CreateInventoryProductCardServiceImportJobProviderTypeDTO) {
        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeName: createInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeName
            }
        });

        if (inventoryProductCardServiceImportJobProviderType == null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found');
        }

        inventoryProductCardServiceImportJobProviderType = this.inventoryProductCardServiceImportJobProviderTypeRepository.create({ ...createInventoryProductCardServiceImportJobProviderTypeDTO });
        inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.save(inventoryProductCardServiceImportJobProviderType);

        let inventoryProductCardServiceImportJobProviderTypeDTO = this.getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderType.inventoryProductCardServiceImportJobProviderTypeId);

        return inventoryProductCardServiceImportJobProviderTypeDTO;

    }

    async updateInventoryProductCardServiceImportJobProviderType(updateInventoryProductCardServiceImportJobProviderTypeDTO: UpdateInventoryProductCardServiceImportJobProviderTypeDTO) {

        let inventoryProductCardServiceImportJobProviderType = await this.inventoryProductCardServiceImportJobProviderTypeRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobProviderTypeId: updateInventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeId
            }
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!inventoryProductCardServiceImportJobProviderType) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found');
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