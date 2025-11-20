import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistImportProductCardProviderTypeDTO, UpdateBuylistImportProductCardProviderTypeDTO, BuylistImportProductCardProviderTypeDTO } from './dto/buylist.import.product.card.provider.type.dto';
import { BuylistImportProductCardProviderType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistImportProductCardProviderTypeService {

    constructor(
        @InjectRepository(BuylistImportProductCardProviderType) private buylistImportProductCardProviderTypeRepository: Repository<BuylistImportProductCardProviderType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistImportProductCardProviderTypeById(buylistImportProductCardProviderTypeId: string) {
        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({ 
            where: { 
                buylistImportProductCardProviderTypeId: buylistImportProductCardProviderTypeId 
            } 
        });
        
        if (buylistImportProductCardProviderType == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_NOT_FOUND', 'Buylist import product card provider type not found for id: ' + buylistImportProductCardProviderTypeId);
        }

        let buylistImportProductCardProviderTypeDTO = new BuylistImportProductCardProviderTypeDTO();
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeId;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeName;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCode = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCode;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeDescription = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeDescription;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileExtension = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileExtension;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileUploadPath;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey = JSON.parse(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileDataKey);
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeIsActive = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeIsActive;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCreateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCreateDate;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeUpdateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeUpdateDate;

        return buylistImportProductCardProviderTypeDTO;

    }

    async getBuylistImportProductCardProviderTypes() {
        let buylistImportProductCardProviderTypes = await this.buylistImportProductCardProviderTypeRepository.find();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistImportProductCardProviderTypes == null) {
            return [];
        }

        let buylistImportProductCardProviderTypeDTOs: BuylistImportProductCardProviderTypeDTO[] = [];

        for(let i = 0; i < buylistImportProductCardProviderTypes.length; i++) {
            let buylistImportProductCardProviderType = buylistImportProductCardProviderTypes[i];
            let buylistImportProductCardProviderTypeDTO = new BuylistImportProductCardProviderTypeDTO();
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeId;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeName;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCode = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCode;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeDescription = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeDescription;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileExtension = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileExtension;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileUploadPath;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey = JSON.parse(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileDataKey);
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeIsActive = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeIsActive;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCreateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCreateDate;
            buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeUpdateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeUpdateDate;

            buylistImportProductCardProviderTypeDTOs.push(buylistImportProductCardProviderTypeDTO);
        }

        return buylistImportProductCardProviderTypeDTOs;
    }

    async getBuylistImportProductCardProviderTypeByName(name: string) {
        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({
            where: {
                buylistImportProductCardProviderTypeName: name
            }
        });

        if (buylistImportProductCardProviderType == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_NOT_FOUND', 'Buylist import product card provider type not found for name: ' + name);
        }

        let buylistImportProductCardProviderTypeDTO = new BuylistImportProductCardProviderTypeDTO();
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeId;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeName;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCode = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCode;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeDescription = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeDescription;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileExtension = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileExtension;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileUploadPath;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey = JSON.parse(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileDataKey);
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeIsActive = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeIsActive;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCreateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCreateDate;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeUpdateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeUpdateDate;


        return buylistImportProductCardProviderTypeDTO;

    }

    async getBuylistImportProductCardProviderTypeByCode(code: string) {
        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({
            where: {
                buylistImportProductCardProviderTypeCode: code
            }
        });

        if (buylistImportProductCardProviderType == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_NOT_FOUND', 'Buylist import product card provider type not found for code: ' + code);
        }

        let buylistImportProductCardProviderTypeDTO = new BuylistImportProductCardProviderTypeDTO();
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeId;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeName;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCode = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCode;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeDescription = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeDescription;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileExtension = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileExtension;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileUploadPath;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey = JSON.parse(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileDataKey);
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeIsActive = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeIsActive;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCreateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCreateDate;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeUpdateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeUpdateDate;


        return buylistImportProductCardProviderTypeDTO;

    }

    async createBuylistImportProductCardProviderType(createBuylistImportProductCardProviderTypeDTO: CreateBuylistImportProductCardProviderTypeDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let buylistImportProductCardProviderType = await this.getBuylistImportProductCardProviderTypeByName(createBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName);

        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (buylistImportProductCardProviderType != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_DUPLICATE', 'Buylist import product card provider type already exists for name: ' + createBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName);
        }

        let newBuylistImportProductCardProviderType = this.buylistImportProductCardProviderTypeRepository.create({ ...createBuylistImportProductCardProviderTypeDTO });
        newBuylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.save(newBuylistImportProductCardProviderType);

        let buylistImportProductCardProviderTypeDTO = this.getBuylistImportProductCardProviderTypeById(newBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeId);

        return buylistImportProductCardProviderTypeDTO;

    }

    async updateBuylistImportProductCardProviderType(updateBuylistImportProductCardProviderTypeDTO: UpdateBuylistImportProductCardProviderTypeDTO) {

        let updateBuylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({
            where: {
                buylistImportProductCardProviderTypeId: updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId
            }
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!updateBuylistImportProductCardProviderType) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_NOT_FOUND', 'Buylist import product card provider type not found for id: ' + updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId);
        }

        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeName = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName;
        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeCode = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCode;
        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeDescription = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeDescription;
        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileExtension = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileExtension;
        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileUploadPath = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath;
        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileDataKey = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey;
        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeIsActive = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeIsActive;
        updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeUpdateDate = new Date();

        await this.buylistImportProductCardProviderTypeRepository.save(updateBuylistImportProductCardProviderType);

        let buylistImportProductCardProviderTypeDTO = this.getBuylistImportProductCardProviderTypeById(updateBuylistImportProductCardProviderType.buylistImportProductCardProviderTypeId);

        return buylistImportProductCardProviderTypeDTO;

    }
    
}