import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistImportProductCardProviderTypeDTO, UpdateBuylistImportProductCardProviderTypeDTO, BuylistImportProductCardProviderTypeDTO } from './dto/buylist.import.product.card.provider.type.dto';
import { BuylistImportProductCardProviderTypeFileDataKey, BuylistImportProductCardProviderTypeFileConditionKey, BuylistImportProductCardProviderTypeFilePrintingKey } from './interface/buylist.import.product.card.provider.type.interface';
import { BuylistImportProductCardProviderType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.entity';

@Injectable()
export class BuylistImportProductCardProviderTypeService {

    constructor(
        @InjectRepository(BuylistImportProductCardProviderType) private buylistImportProductCardProviderTypeRepository: Repository<BuylistImportProductCardProviderType>,
    ) { }

    async getBuylistImportProductCardProviderTypeById(buylistImportProductCardProviderTypeId: string): Promise<BuylistImportProductCardProviderTypeDTO> {
        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({ 
            where: { 
                buylistImportProductCardProviderTypeId: buylistImportProductCardProviderTypeId 
            } 
        });
        
        if (buylistImportProductCardProviderType == null) {
            throw new NotFoundException('Buylist import product card provider type not found');
        }

        let buylistImportProductCardProviderTypeDTO = await this.createBuylistImportProductCardProviderTypeDTO(buylistImportProductCardProviderType);

        return buylistImportProductCardProviderTypeDTO;

    }

    async getBuylistImportProductCardProviderTypes(): Promise<BuylistImportProductCardProviderTypeDTO[]> {
        let buylistImportProductCardProviderTypes = await this.buylistImportProductCardProviderTypeRepository.find();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistImportProductCardProviderTypes == null) {
            return [];
        }

        let buylistImportProductCardProviderTypeDTOs: BuylistImportProductCardProviderTypeDTO[] = [];

        for(let i = 0; i < buylistImportProductCardProviderTypes.length; i++) {
            let buylistImportProductCardProviderType = buylistImportProductCardProviderTypes[i];
            let buylistImportProductCardProviderTypeDTO = await this.createBuylistImportProductCardProviderTypeDTO(buylistImportProductCardProviderType);

            buylistImportProductCardProviderTypeDTOs.push(buylistImportProductCardProviderTypeDTO);
        }

        return buylistImportProductCardProviderTypeDTOs;
    }

    async getBuylistImportProductCardProviderTypeByName(buylistImportProductCardProviderTypeName: string): Promise<BuylistImportProductCardProviderTypeDTO> {
        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({
            where: {
                buylistImportProductCardProviderTypeName: buylistImportProductCardProviderTypeName
            }
        });

        if (buylistImportProductCardProviderType == null) {
            throw new NotFoundException('Buylist import product card provider type not found');
        }

        let buylistImportProductCardProviderTypeDTO =await this.createBuylistImportProductCardProviderTypeDTO(buylistImportProductCardProviderType);

        return buylistImportProductCardProviderTypeDTO;

    }

    async getBuylistImportProductCardProviderTypeByCode(buylistImportProductCardProviderTypeCode: string): Promise<BuylistImportProductCardProviderTypeDTO> {
        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({
            where: {
                buylistImportProductCardProviderTypeCode: buylistImportProductCardProviderTypeCode
            }
        });

        if (buylistImportProductCardProviderType == null) {
            throw new NotFoundException('Buylist import product card provider type not found');
        }

        let buylistImportProductCardProviderTypeDTO = await this.createBuylistImportProductCardProviderTypeDTO(buylistImportProductCardProviderType);


        return buylistImportProductCardProviderTypeDTO;

    }

    async createBuylistImportProductCardProviderTypeDTO(buylistImportProductCardProviderType: BuylistImportProductCardProviderType): Promise<BuylistImportProductCardProviderTypeDTO> {
        let buylistImportProductCardProviderTypeDTO = new BuylistImportProductCardProviderTypeDTO();
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeId;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeName;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCode = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCode;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeDescription = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeDescription;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileExtension = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileExtension;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileUploadPath;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey = JSON.parse(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileDataKey) as BuylistImportProductCardProviderTypeFileDataKey;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileConditionKey = JSON.parse(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileConditionKey) as BuylistImportProductCardProviderTypeFileConditionKey;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFilePrintingKey = JSON.parse(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFilePrintingKey) as BuylistImportProductCardProviderTypeFilePrintingKey;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeIsActive = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeIsActive;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCreateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCreateDate;
        buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeUpdateDate = buylistImportProductCardProviderType.buylistImportProductCardProviderTypeUpdateDate;

        return buylistImportProductCardProviderTypeDTO;
    }

    async createBuylistImportProductCardProviderType(createBuylistImportProductCardProviderTypeDTO: CreateBuylistImportProductCardProviderTypeDTO): Promise<BuylistImportProductCardProviderTypeDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({
            where: {
                buylistImportProductCardProviderTypeName: createBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName
            }
        });

        if (buylistImportProductCardProviderType != null) {
            throw new ConflictException('Buylist import product card provider type already exists');
        }

        buylistImportProductCardProviderType = this.buylistImportProductCardProviderTypeRepository.create({ ...createBuylistImportProductCardProviderTypeDTO });
        buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.save(buylistImportProductCardProviderType);

        let buylistImportProductCardProviderTypeDTO = this.getBuylistImportProductCardProviderTypeById(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeId);

        return buylistImportProductCardProviderTypeDTO;

    }

    async updateBuylistImportProductCardProviderType(updateBuylistImportProductCardProviderTypeDTO: UpdateBuylistImportProductCardProviderTypeDTO): Promise<BuylistImportProductCardProviderTypeDTO> {

        let buylistImportProductCardProviderType = await this.buylistImportProductCardProviderTypeRepository.findOne({
            where: {
                buylistImportProductCardProviderTypeId: updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeId
            }
        });

        if (!buylistImportProductCardProviderType) {
            throw new NotFoundException('Buylist import product card provider type not found');
        }

        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeName = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeName;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeCode = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeCode;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeDescription = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeDescription;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileExtension = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileExtension;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileUploadPath = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileUploadPath;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileDataKey = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFileConditionKey = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileConditionKey;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeFilePrintingKey = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFilePrintingKey;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeIsActive = updateBuylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeIsActive;
        buylistImportProductCardProviderType.buylistImportProductCardProviderTypeUpdateDate = new Date();

        await this.buylistImportProductCardProviderTypeRepository.save(buylistImportProductCardProviderType);

        let buylistImportProductCardProviderTypeDTO = this.getBuylistImportProductCardProviderTypeById(buylistImportProductCardProviderType.buylistImportProductCardProviderTypeId);

        return buylistImportProductCardProviderTypeDTO;

    }
    
}